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
            <div class="grid place-items-center">
                <div class="flex flex-col items-center gap-4">
                    <div class="flex flex-row gap-4">
                        <TimeCard />
                        <TodoCard />
                    </div>
                    <div>
                        <PomodoroCard />
                    </div>
                </div>
            </div>
        </main>
    </UContainer>
</template>