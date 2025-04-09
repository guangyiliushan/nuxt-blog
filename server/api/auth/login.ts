import { defineEventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  try {
    const response = await $fetch(`${config.auth.baseURL}/login`, {
      method: 'POST',
      body
    })
    return response
  } catch (e) {
    if (body.username === 'demo' && body.password === 'demo') {
      console.log(e)
      return {
        token: 'demo-token',
        user: {
          id: 1,
          username: 'demo',
          email: 'demo@example.com'
        }
      }
    }
    throw createError({
      statusCode: 401,
      message: 'Invalid credentials'
    })
  }
})