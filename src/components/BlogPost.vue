<template>
  <article class="max-w-4xl mx-auto py-16 px-6 prose prose-blue pt-40">
    <h1 class="text-4xl font-bold text-blue-900 mb-6">{{ post.meta.title }}</h1>
    <p class="text-gray-500 mb-4">{{ post.meta.date }}</p>

    <img
      v-if="post.meta.image"
      :src="post.meta.image"
      :alt="post.meta.title"
      class="rounded-xl mb-6 w-full h-64 object-cover"
      loading="eager"
      width="800"
      height="450"
    />

    <div v-html="post.html"></div>

    <RouterLink
      to="/blog"
      class="inline-block mt-10 text-blue-700 font-semibold hover:underline"
    >
      ← Back to Blog
    </RouterLink>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useSeo } from '../composables/useSeo.js'
import { blogPostingSchema, breadcrumbSchema } from '../seo/schemas.js'

const route = useRoute()
const markdownFiles = import.meta.glob('../blog/*.md', { eager: true })

const post = computed(() => {
  const slug = route.params.slug
  const file = markdownFiles[`../blog/${slug}.md`]
  if (!file) {
    return { meta: { title: 'Post not found' }, html: '<p>Post not found.</p>', slug }
  }
  return {
    slug,
    meta: file.frontmatter || {},
    html: marked.parse(file.default || ''),
  }
})

useSeo(() => {
  const meta = post.value.meta || {}
  const path = `/blog/${post.value.slug}`
  const title = meta.title
    ? `${meta.title} | Monsun Metocean`
    : 'Blog Post | Monsun Metocean'
  const description =
    meta.description ||
    meta.excerpt ||
    'Metocean intelligence insights from Monsun.'

  return {
    title,
    description,
    path,
    image: meta.image,
    type: 'article',
    jsonLd: [
      blogPostingSchema({
        title: meta.title || title,
        description,
        image: meta.image,
        date: meta.date,
        path,
      }),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: meta.title || 'Post', path },
      ]),
    ],
  }
})
</script>
