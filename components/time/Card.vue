<template>
    <div>
        <div class="">
            <div class="">
                <span>{{ timeObj.hour }}</span>:
                <span>{{ timeObj.minute }}</span>:
                <span>{{ timeObj.second }}</span>
            </div>
            <div class="">
                {{ [timeObj.year, timeObj.month, timeObj.day].join('/') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const timeObj = ref({
    hour: '',
    minute: '',
    second: '',
    year: 0,
    month: 0,
    day: 0
})

const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0')

const updateTime = () => {
    const now = new Date()
    timeObj.value = {
        hour: formatTimeUnit(now.getHours()),
        minute: formatTimeUnit(now.getMinutes()),
        second: formatTimeUnit(now.getSeconds()),
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
    }
}

onMounted(() => {
    updateTime()
    setInterval(updateTime, 1000)
})
</script>
