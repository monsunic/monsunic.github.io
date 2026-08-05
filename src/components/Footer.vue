<template>
    <footer class="bg-gray-900 text-white pt-16 pb-8">
        <div class="container mx-auto px-4">
            <div class="grid grid cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <!--Company Information-->
                <section class="lg:col-span-2">
                    <header class="flex items-center mb-6">
                        <img src="@assets/nusawave-icon-white.ico" alt="Monsun Icon" class="w-6 h-6" 
                        aria-hidden="true"/>
                        <h2 class="text-2xl font-bold ml-3">Monsun Intelligence</h2>
                    </header>
                    <p class="text-gray-400 leading-relaxed mb-10">
                        Bringing value to safe, optimized, and efficient operations for risky maritime and offshore activities.
                    </p>
                    <nav aria-label="Social media links">
                        <ul class="flex space-x-4">
                            <li v-for="(item,index) in socialLinks" :key="index">
                                <a :href="item.href" class="bg-gray-800 text-gray-400 hover:text-white transition-colors duration-200"
                                :aria-label="item.label" target="_blank" rel="noopener noreferrer">
                                    <Icon :icon="item.icon" class="text-lg"/>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
                <!--Quick Links-->
                <section>
                    <h3 class="text-xl font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:left-0
                    after:bottom-0 after:w-12 after:h-1 after:bg-blue-900">Quick Links</h3>
                    <nav aria-label="Quick links">
                        <ul class="space-y-3">
                            <li v-for="(item,index) in quickLinks" :key="index">
                                <a :href="item.href" class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200"
                                :aria-label="item.label" target="_blank" rel="noopener noreferrer">
                                    <Icon :icon="item.icon" class="text-lg"/>
                                    <span>{{ item.label }}</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
                <!--Contact Information-->
                <address>
                <h3
                    class="text-xl font-bold mb-6 relative pb-2 
                        after:content-[''] after:absolute after:left-0 
                        after:bottom-0 after:w-12 after:h-1 after:bg-blue-900"
                    id="get-in-touch"
                >
                    Contact Us
                </h3>

                <ul class="space-y-4">
                    <li
                    v-for="(item, index) in contactInfo"
                    :key="index"
                    class="flex items-start"
                    >
                    <Icon
                        :icon="item.icon"
                        class="text-xl mt-1 mr-4 text-gray-500 flex-shrink-0"
                    />

                    <!-- dynamic component for link or span -->
                    <component
                        :is="item.content.type"
                        v-bind="item.content.props"
                        class="text-gray-400 hover:text-blue-400 transition break-words"
                    >
                        {{ item.content.text }}
                    </component>
                    </li>
                </ul>
                </address>
            </div>
            <!--Newsletter Subscription-->
            <section class="bg-gray-800 rounded-xl p-8 mb-12" aria-labelledby="newsletter-heading">
            <div class="flex flex-col lg:flex-row items-center justify-between">
                <div class="mb-6 lg:mb-0 lg:mr-8">
                <h3 id="newsletter-heading" class="text-xl font-bold mb-2 text-white">
                    Subscribe to Our Blog
                </h3>
                <p class="text-gray-400">Get updates on forecasts, analytics, and digital ocean insights.</p>
                </div>

                <form
                class="flex flex-col sm:flex-row w-full lg:w-auto"
                aria-label="Newsletter subscription form"
                >
                <label for="newsletter-email" class="sr-only">Your email address</label>
                <input
                    type="email"
                    id="newsletter-email"
                    placeholder="Your email address"
                    class="px-6 py-3 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 sm:mb-0 sm:mr-4 w-full"
                    required
                />
                <button
                    type="submit"
                    class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition"
                >
                    Subscribe
                </button>
                </form>
            </div>
            </section>
        <footer class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {{ currentYear }} Monsun Intelligence. All rights reserved
        </p>
        <nav aria-label="Legal links">
            <ul class="flex space-x-6">
            <li v-for="(link, index) in legalLinks" :key="index">
                <a
                :href="link.href"
                class="text-gray-500 hover:text-white text-sm transition"
                >
                {{ link.label }}
                </a>
            </li>
            </ul>
        </nav>
        </footer>
        </div>
    </footer>
</template>
<script setup>
import { ref, computed } from 'vue';
const currentYear= computed(() => new Date().getFullYear());
const socialLinks = ref([
    // { label: 'Facebook', href: '#', icon: 'fa-brands:facebook-f' },
    // { label: 'Twitter', href: '#', icon: 'fa-brands:twitter' },
    { label: 'Instagram', href: '#', icon: 'fa-brands:instagram' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/monsunic', icon: 'fa-brands:linkedin-in' },
    { label: 'YouTube', href: '#', icon: 'fa-brands:youtube' },
]);
const quickLinks = ref([
    { label: 'Home', href: '#home', icon: 'mdi:home' },
    { label: 'About Us', href: '#about', icon: 'mdi:information' },
    { label: 'Services', href: '#services', icon: 'mdi:cog' },
    { label: 'Outreach', href: '#outreach', icon: 'mdi:earth' },
    { label: 'Contact', href: '#contact', icon: 'mdi:phone' },
]);
const contactInfo = ref([
    { 
        icon:"material-symbols:location-on",
        content:{
            type:'a',
            props:{
                href:"https://maps.google.com/?q=Gd+A,+Lt.5,+Jl.+Angkasa+I+No.+2,+Kemayoran,+Jakarta+10720,+Indonesia",
                target:"_blank",
                rel:"noopener noreferrer",
            },
            text:"Gd A, Lt.5, Jl. Angkasa I No. 2, Kemayoran, Jakarta 10720, Indonesia."
        }
    },
    { 
        icon:"material-symbols:mail",
        content:{
            type:'a',
            props:{
                href:"mailto:contact@monsun.io",
            },
            text:"contact@monsun.io"
        }
    },
    { 
        icon:"fa-solid:phone-alt",
        content:{
            type:'a',
            props:{
                href:"#",
            },
            text:"+62 822 4638 9999"
        }
    },
    { 
        icon:"fa-solid:clock",
        content:{
            type:'span',
            props:{},
            text:"24/7 Support"
        }
    },
]);
const legalLinks = ref([
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Sitemap', href: '#' },
]);
</script>
