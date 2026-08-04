<template>
  <!-- Section: Blog -->
    <section
    id="latest-blog"
    class="relative z-10 overflow-hidden bg-gradient-to-b from-transparent via-blue-50/60 to-white py-20 sm:py-28"
    >
    <!-- Header -->
    <div
      class="max-w-3xl mx-auto text-center px-6 sm:px-8 mb-16"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2 class="text-2xl sm:text-5xl font-bold text-blue-900 mb-6">
        Latest from Our Blog
      </h2>
      <p class="text-gray-700 text-lg sm:text-xl leading-relaxed">
        Insights, forecasts, and technology updates from the Monsun team.
      </p>
    </div>

    <!-- Blog Cards -->
    <div
      class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 sm:px-8"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <div
        v-for="(post, index) in latestPosts"
        :key="index"
        class="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <img
            v-if="post.meta.image"
            :src="post.meta.image"
            alt="Blog cover"
            class="rounded-xl mb-6 object-cover w-full h-48"
          />
          <h3 class="text-xl font-semibold text-blue-800 mb-3">
            <RouterLink
              :to="`/blog/${post.slug}`"
              class="hover:text-blue-900 transition-colors duration-200"
            >
              {{ post.meta.title }}
            </RouterLink>
          </h3>
          <p class="text-gray-600 leading-relaxed mb-6">
            {{ post.meta.excerpt }}
          </p>
        </div>
        <RouterLink
          :to="`/blog/${post.slug}`"
          class="text-blue-700 font-medium inline-flex items-center group"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </RouterLink>
      </div>
    </div>

    <!-- See More Button -->
    <div class="text-center mt-14">
      <RouterLink
        to="/blog"
        class="inline-block bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
      >
        View More Blogs
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue"

// ✅ 1. Load all markdown files dynamically
const markdownFiles = import.meta.glob('../blog/*.md', { eager: true })

// ✅ 2. Convert them into an array of objects
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

// ✅ 3. Pick latest 3 posts by date
const latestPosts = ref([])

onMounted(() => {
  latestPosts.value = [...posts.value]
    .filter(p => p.meta.date) // make sure it has a date
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
    .slice(0, 3)
})
</script>