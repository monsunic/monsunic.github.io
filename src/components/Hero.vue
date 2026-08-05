<template>
    <header class="relative overflow-hidden bg-gradient-to-b from-blue-400/10 via-white/80 to-white/80 pt-16 sm:pt-32" id="home">
        <article class="max-w-screen-xl mx-auto px-4 sm:px-8 py-16 flex flex-col-reverse
        lg:flex-row items-center gap-10 lg:gap-20">
        <!-- Hero Content -->
        <section class="w-full lg:w-1/2 text-center lg:text-left">
            <hgroup data-aos="fade-up" data-aos-delay="500">
                <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                    <span class="text-blue-900">Metocean Intelligence</span> for Safer Offshore Decisions
                </h1>
                <p class="text-gray-700 text-lg sm:text-xl mb-6">
                    Monsun provides metocean consultancy and intelligence — sea state monitoring, marine forecasting, and predictive analytics that keep maritime and offshore operations safe, efficient, and data-driven.
                </p>
            </hgroup>
            <nav data-aos="fade-up" data-aos-delay="400"
            class="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-12">
            <a
                href="#contact"
                class="bg-blue-900 text-white px-8 py-3 rounded-full tansition shadow-lg">
                Consult with Us
            </a>
            <a href="#services"
                class="border border-blue-800 text-blue-900 hover:bg-blue-50
                text-center px-8 py-3 rounded-full transition" aria-label="Explore our services">
                Explore our Services
            </a>
            </nav>
            <!-- Stats Section -->
             <aside data-aos="fade-up" data-aos-delay="200" class="py-4">
                <ul class="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-4 text-center">
                    <li v-for="(stat, index) in stats" :key="index">
                        <strong class="text-2xl font-bold text-blue-900">{{ stat.value }}</strong>
                        <small class="block text-gray-600">{{ stat.label }}</small>
                    </li>
                </ul>
             </aside>
        </section>
        <!-- Hero Image -->
        <figure data-aos="fade-up" data-aos-delay="700" class="w-full lg:w-1/2 flex justify-center relative">
            <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                <span class="bg-blue-500 rounded w-64 g-64 sm:w-110 sm:h-80 absolute -top-10 -left-10
                opacity-20" aria-hidden="true"></span>
                <img src="@assets/hero-metocean.jpg" alt="Monsun metocean intelligence for offshore and maritime operations"
                class="relative z-10 rounded shadow-2xl w-full object-cover"
                width="960" height="640" loading="eager"/>
            </div>
        </figure>
        </article>
    </header>
</template>
<script setup>
import { ref } from 'vue';
const stats = ref([
    { label: 'Projects Completed', value: '5+' },
    { label: 'Clients', value: '3+' },
    { label: 'Years of Experience', value: '1+' },
]);
</script>