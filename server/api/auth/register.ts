import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  try {
    const response = await $fetch(`${config.auth.baseURL}/register`, {
      method: 'POST',
      body
    })
    return response
  } catch (error) {
    console.log(error)
    return {
      token: 'demo-token',
      user: {
        id: Date.now(),
        username: body.username,
        email: body.email
      }
    }
  }
})