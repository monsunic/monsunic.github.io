<template>
  <section class="py-20 bg-gradient-to-b from-transparent via-blue-50/60 to-white pt-40">
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      <h2 class="text-3xl sm:text-5xl font-bold text-blue-900 text-center mb-10">
        Monsun Blog
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <RouterLink
          v-for="post in sortedPosts"
          :key="post.slug"
          :to="`/blog/${post.slug}`"
          class="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <img
              v-if="post.meta.image"
              :src="post.meta.image"
              :alt="post.meta.title"
              class="rounded-xl mb-6 object-cover w-full h-48"
            />
            <h3 class="text-xl font-semibold text-blue-800 mb-3">
              {{ post.meta.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ post.meta.excerpt }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dynamically import all markdown files (already parsed by vite.config.js)
const markdownFiles = import.meta.glob('../blog/*.md', { eager: true })

const posts = ref(
  Object.keys(markdownFiles).map((path) => {
    const file = markdownFiles[path]
    return {
      slug: path.split('/').pop().replace('.md', ''),
      meta: file.frontmatter || {},
      content: file.default || '',
    }
  })
)

// Sort by date (newest first)
const sortedPosts = computed(() =>
  posts.value.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
)
</script>
