<script setup lang="ts">
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})
</script>

<template>
    <main>
        <ContentRenderer v-if="post" :value="post" />
        <dev v-else />
    </main>
</template>