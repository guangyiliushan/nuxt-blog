<script setup lang="ts">
import { PomodoroCard } from '#components';

</script>

<template>
    <UContainer>
        <header>
            <h1>Home</h1>
            <p>Welcome to the home page</p>
        </header>
        <main>
            <UButton to="/blog" class="mt-4">View All Posts</UButton>
            <UButton to="/login" class="mt-4">Login</UButton>
        </main>
        <PomodoroCard />
        <TodoCard />
    </UContainer>
</template>