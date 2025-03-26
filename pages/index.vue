<script setup lang="ts">

</script>

<template>
    <UContainer>
        <header>
            <h1>Home</h1>
            <p>Welcome to the home page</p>
            
            <UButton to="/blog" class="mt-4">View All Posts</UButton>
            <UButton to="/user/login" class="mt-4">Login</UButton>
        </header>
        <main>
            <div class="flex gap-4">
                <PomodoroCard />
                <TodoCard />
            </div>
        </main>
    </UContainer>
</template>