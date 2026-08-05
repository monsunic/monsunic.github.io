<template>
  <section class="py-20 bg-gradient-to-b from-transparent via-blue-50/60 to-white pt-40">
    <div class="max-w-6xl mx-auto px-6 sm:px-8">
      <h1 class="text-3xl sm:text-5xl font-bold text-blue-900 text-center mb-4">
        Monsun Blog
      </h1>
      <p class="text-center text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
        Metocean insights, marine forecasting, and ocean data intelligence from the Monsun consultancy team.
      </p>

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
              loading="lazy"
              width="800"
              height="450"
            />
            <h2 class="text-xl font-semibold text-blue-800 mb-3">
              {{ post.meta.title }}
            </h2>
            <p class="text-gray-600 leading-relaxed">
              {{ post.meta.excerpt || post.meta.description }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSeo } from '../composables/useSeo.js'
import { breadcrumbSchema } from '../seo/schemas.js'

useSeo({
  title: 'Monsun Blog | Metocean Insights & Forecasting',
  description:
    'Read Monsun blog articles on metocean consultancy, sea state monitoring, marine forecasting, offshore wind, and ocean data intelligence.',
  path: '/blog',
  jsonLd: breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]),
})

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

const sortedPosts = computed(() =>
  [...posts.value].sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
)
</script>
