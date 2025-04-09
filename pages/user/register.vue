<template>
    <div class="max-w-md mx-auto mt-10 p-6 rounded-lg shadow">
      <h1 class="text-2xl font-bold mb-6 text-center">用户注册</h1>
      <UForm :state="formData" @submit="submitForm">
        <UFormGroup label="用户名" name="username" required>
          <UInput 
            v-model="formData.username" 
            placeholder="请输入用户名"
            icon="i-heroicons-user"
          />
        </UFormGroup>
  
        <UFormGroup label="邮箱" name="email" required>
          <UInput 
            v-model="formData.email" 
            type="email"
            placeholder="请输入邮箱"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>
  
        <UFormGroup label="密码" name="password" required>
          <UInput 
            v-model="formData.password" 
            type="password"
            placeholder="请输入密码"
            icon="i-heroicons-lock-closed"
          />
        </UFormGroup>
  
        <UButton 
          type="submit" 
          block
          :loading="isSubmitting"
          :disabled="isSubmitting"
          class="mt-6"
        >
          {{ isSubmitting ? '注册中...' : '立即注册' }}
        </UButton>
      </UForm>
    </div>
  </template>
  
  <script setup lang="ts">
  const formData = reactive({
    username: '',
    email: '',
    password: ''
  })
  
  const isSubmitting = ref(false)
  
  async function submitForm() {
    isSubmitting.value = true
    
    try {
      const { data, error } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: formData
      })
  
      if (error.value) {
        throw error.value
      }
  
      // 注册成功处理
      useToast().add({
        title: '注册成功',
        description: '您已成功注册账号',
        icon: 'i-heroicons-check-circle',
      })
      
      await navigateTo('/login')
    } catch (e: any) {
      useToast().add({
        title: '注册失败',
        description: e.data?.message || '请检查您的输入',
        icon: 'i-heroicons-exclamation-circle',
        color: 'error'
      })
    } finally {
      isSubmitting.value = false
    }
  }
  </script>