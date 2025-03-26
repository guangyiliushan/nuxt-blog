<template>
    <div class="w-55 h-70 shadow-sm rounded-lg p-4">
        <div class="flex">
            <UInput v-model="newItem" placeholder="输入新事项" icon="i-heroicons-plus-circle" @keyup.enter="addItem" />
            <UButton label="添加" color="primary" :disabled="!newItem.trim()" @click="addItem" />
        </div>

        <ul class="space-y-2 overflow-hidden mt-4 ">
            <li 
                v-for="(todo, index) in todos" 
                :key="index"
                class="flex items-center justify-between rounded-lg shadow-sm p-2"
            >
                <div class="flex items-center">
                    <UCheckbox v-model="todo.completed" color="primary" />
                    <span 
                        :class="{
                            'line-through opacity-50': todo.completed,
                            'text-gray-900 dark:text-white': !todo.completed
                        }" 
                        class="truncate"
                    >
                        {{ todo.text }}
                    </span>
                </div>
                <UButton 
                    color="error" 
                    variant="ghost" 
                    icon="i-heroicons-trash-20-solid"
                    @click="deleteItem(index)" 
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
class Todo {
    constructor(
        public text: string,
        public completed: boolean = false
    ) { }

    static create(text: string): Todo | null {
        return text.trim() ? new Todo(text.trim()) : null
    }
}

const todos = ref<Todo[]>([])
const newItem = ref('')

const validationRules = {
    notEmpty: (text: string) => text.trim().length > 0
}

const addItem = () => {
    if (!validationRules.notEmpty(newItem.value)) return

    const todo = Todo.create(newItem.value)
    if (!todo) return

    todos.value.push(todo)
    newItem.value = ''
}

const deleteItem = (index: number) => {
    todos.value = todos.value.filter((_, i) => i !== index)
}
</script>
