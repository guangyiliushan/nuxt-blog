<template>
    <div>
        <div v-if="data">
            Hello {{ data.user.username }}!
        </div>
        <div v-else>
            You are not logged in.
        </div>
    </div>
</template>

<script setup lang="ts">
const { data } = useAuth()
</script>