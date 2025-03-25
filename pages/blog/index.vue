<script setup>
const posts = await queryCollection('blog').order('date', 'DESC').all();
</script>

<template>
  <div>
    <h1>Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.path">
        <nuxt-link :to="post.path">{{ post.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>
