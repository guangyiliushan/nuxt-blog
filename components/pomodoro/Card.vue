<template>

    <div class="w-50 h-70 text-center p-6 rounded-lg shadow-sm">
      <div class="text-4xl font-mono mt-12 mb-5">{{ formattedWorkTime }}</div>
      <div class="text2xl mb-10">{{ formattedBreakTime }}</div>
      <div class="space-x-2 flex flex-row justify-center items-center">
        <UButton @click="toggleSettings">
          <Icon :name="'heroicons:cog-6-tooth-20-solid'" />
        </UButton>
        <UButton :disabled="remainingTime === 0" @click="toggleTimer">
          {{ isRunning ? '暂停' : '开始' }}
        </UButton>
        <UButton @click="resetTimer">
          <Icon name="heroicons:arrow-path-20-solid" />
        </UButton>
      </div>
    </div>

    <div v-if="showSettings" class="w-50 h-70 text-center p-4 rounded-lg shadow-sm">
      <h2 class="text-md font-semibold">调整设置</h2>
      <div class="flex flex-col">
        <div class="p-2 rounded-md">
          <h3 class="text-sm font-medium">番茄钟时长</h3>
          <div class="flex items-center justify-center gap-1">
            <UButton :disabled="workTime <= 1" @click="adjustTime('work', -1)">
              <Icon name="heroicons:minus-small" />
            </UButton>
            <UInput v-model.number="workTime" type="number" variant="soft" min="1" class=" w-12" />
            <UButton @click="adjustTime('work', 1)">
              <Icon name="heroicons:plus-small" />
            </UButton>
          </div>
        </div>

        <div class="p-2 rounded-md">
          <h3 class="font-medium">休息时长</h3>
          <div class="flex items-center justify-center gap-2">
            <UButton :disabled="breakTime <= 1" @click="adjustTime('break', -1)">
              <Icon name="heroicons:minus-small" class="w-5 h-5" />
            </UButton>
            <UInput v-model.number="breakTime" type="number" variant="soft" class="w-12" min="1" />
            <UButton @click="adjustTime('break', 1)">
              <Icon name="heroicons:plus-small" class="w-5 h-5" />
            </UButton>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center p-2">
        <span class="text-gray-600">自动重启</span>
        <USwitch v-model="autoRestart" color="error" variant="soft" />
      </div>
      <div class="flex justify-between items-center p-2">
        <span class="text-gray-600">结束提示</span>
        <USwitch v-model="showNotification" color="error" variant="soft" />
      </div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from 'vue'

// 表驱动
const PHASE_CONFIG = {
  work: {
    label: '工作时间',
    timeRef: () => workTime.value * 60,
    next: 'break'
  },
  break: {
    label: '休息时间',
    timeRef: () => breakTime.value * 60,
    next: 'work'
  }
} as const

// 封装计时器
class PomodoroTimer {
  private timerId: number | null = null
  
  constructor(private callback: () => void) {}

  start(interval: number = 1000) {
    if (this.timerId) return
    this.timerId = setInterval(this.callback, interval)
  }

  stop() {
    if (!this.timerId) return
    clearInterval(this.timerId)
    this.timerId = null
  }
}

// 格式化时间
const createTimeFormatter = (timeRef: { value: number }) => 
  computed(() => {
    const totalSeconds = timeRef.value
    if (totalSeconds < 0) return '00:00'
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })


const DEFAULT_WORK_TIME = 25
const DEFAULT_BREAK_TIME = 5

const workTime = ref(DEFAULT_WORK_TIME)
const breakTime = ref(DEFAULT_BREAK_TIME)
const autoRestart = ref(true)
const showNotification = ref(true)
const showSettings = ref(false)

const isWorking = ref(true)
const isRunning = ref(false)
const remainingTime = ref(PHASE_CONFIG.work.timeRef())
const completedCycles = ref(0)
const timer = new PomodoroTimer(() => {
  remainingTime.value--
  if (remainingTime.value <= 0) handleTimerEnd()
})

const formattedWorkTime = createTimeFormatter(
  computed(() => isWorking.value ? remainingTime.value : workTime.value * 60)
)
const formattedBreakTime = createTimeFormatter(
  computed(() => !isWorking.value ? remainingTime.value : breakTime.value * 60)
)

function handleTimerEnd() {
  timer.stop()
  isRunning.value = false
  
  const nextPhase = PHASE_CONFIG[isWorking.value ? 'work' : 'break'].next
  remainingTime.value = PHASE_CONFIG[nextPhase].timeRef()
  
  isWorking.value = !isWorking.value
  if (isWorking.value) completedCycles.value++
  
  if (autoRestart.value) {
    isRunning.value = true
    timer.start()
  }
}

function toggleTimer() {
  if (!remainingTime.value) return
  
  isRunning.value = !isRunning.value
  if (isRunning.value) {
    if (remainingTime.value === PHASE_CONFIG[isWorking.value ? 'work' : 'break'].timeRef()) {
      remainingTime.value = PHASE_CONFIG[isWorking.value ? 'work' : 'break'].timeRef()
    }
    timer.start()
  } else {
    timer.stop()
  }
}

function resetTimer() {
  timer.stop()
  isRunning.value = false
  isWorking.value = true
  remainingTime.value = PHASE_CONFIG.work.timeRef()
  completedCycles.value = 0
}

function adjustTime(type: 'work' | 'break', amount: number) {
  if (type === 'work') {
    workTime.value = Math.max(1, workTime.value + amount)
    if (isWorking.value && !isRunning.value) {
      remainingTime.value = isWorking.value 
        ? workTime.value * 60 
        : remainingTime.value
    }
  } else if (type === 'break') {
    breakTime.value = Math.max(1, breakTime.value + amount)
    if (!isWorking.value && !isRunning.value) {
      remainingTime.value = !isWorking.value 
        ? breakTime.value * 60 
        : remainingTime.value
    }
  }
}

function toggleSettings() {
  showSettings.value = !showSettings.value
}

onMounted(() => {
  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') toggleTimer()
    if (e.code === 'Escape') resetTimer()
  })
})

onUnmounted(() => {
  timer.stop()
})
</script>