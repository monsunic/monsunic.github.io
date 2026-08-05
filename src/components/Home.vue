<template>
  <div>
    <Hero />
    <Services />
    <Outreach />
    <Blog />
    <About />
    <Contact />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Hero from '@components/Hero.vue'
import About from '@components/About.vue'
import Services from '@components/Services.vue'
import Contact from '@components/Contact.vue'
import Outreach from '@components/Outreach.vue'
import Blog from '@components/Blog.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useSeo } from '../composables/useSeo.js'
import {
  organizationSchema,
  websiteSchema,
  professionalServiceSchema,
} from '../seo/schemas.js'
import { DEFAULT_DESCRIPTION } from '../config/site.js'

useSeo({
  title: 'Monsun | Metocean Intelligence & Consultancy',
  description: DEFAULT_DESCRIPTION,
  path: '/',
  jsonLd: [organizationSchema(), websiteSchema(), professionalServiceSchema()],
})

onMounted(() => {
  AOS.init()
})
</script>
