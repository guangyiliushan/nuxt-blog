<script setup lang="ts">

const loginType = ref(true)
const formData = ref({
    username: '',
    email: '',
    password: '',
})
const errorMessage = ref('')



</script>

<template>
    <div>
        <div>
            <UButton @click="loginType = true">用户名</UButton>
            <UButton @click="loginType = false">邮箱</UButton>
        </div>
        <form @submit.prevent="">
            <div>
                <div v-if="loginType"><label for="username">用户名:</label>
                    <UInput id="username" v-model="formData.username" type="text" required />
                </div>
                <div v-else><label for="email">邮箱:</label>
                    <UInput id="email" v-model="formData.email" type="email" required />
                </div>
                <label for="password">密码:</label>
                <UInput id="password" v-model="formData.password" type="password" required />
            </div>
            <ULink href="/user/register">注册</ULink>
            <UButton>登录</UButton>
        </form>
        <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
</template>
