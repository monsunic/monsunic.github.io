<template>
<section id="contact" class="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/80 to-transparent py-16 sm:py-24 flex items-center justify-center">
  <div class="lg:w-3/5 rounded-3xl shadow-2xl p-8 bg-white backdrop-blur-sm" data-aos="fade-up" data-aos-delay="300">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Send Us a Message</h2>

    <form class="space-y-4" @submit.prevent="sendMessage">
      <fieldset class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-gray-700 font-medium mb-2">Full Name</label>
          <input v-model="form.name" type="text" id="name" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent" />
        </div>
        <div>
          <label for="phone" class="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input v-model="form.phone" type="tel" id="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent" />
        </div>
      </fieldset>

      <fieldset class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
          <input v-model="form.email" type="email" id="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent" />
        </div>
        <div>
          <label for="company" class="block text-gray-700 font-medium mb-2">Company / Affiliation</label>
          <input v-model="form.company" type="text" id="company" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent" />
        </div>
      </fieldset>

      <div>
        <label for="service" class="block text-gray-700 font-medium mb-2">Service Interested In</label>
        <select v-model="form.service" id="service" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">Select a service</option>
          <option v-for="s in services" :key="s.value" :value="s.value">{{ s.label }}</option>
        </select>
      </div>

      <div>
        <label for="message" class="block text-gray-700 font-medium mb-2">Your Message</label>
        <textarea v-model="form.message" id="message" rows="5" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
      </div>
      <div class="flex items-center justify-center">
        <button
          type="submit"
          class="bg-blue-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-800 transition w-full md:w-auto"
          aria-label="Submit contact form"
        >
          Send Message
        </button>
      </div>

      <!-- ✨ Pesan sukses / error muncul di sini -->
      <p v-if="responseMessage"
        :class="responseStatus === 'success'
          ? 'text-green-600 text-center mt-4 font-medium'
          : 'text-red-600 text-center mt-4 font-medium'">
        {{ responseMessage }}
      </p>
    </form>
  </div>
</section>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  { label: 'Real-Time Sea State Monitoring', value: 'real-time-sea-state-monitoring' },
  { label: 'Predictive Analytics for Offshore Operations', value: 'predictive-analytics-offshore-operations' },
  { label: 'Custom Data Solutions', value: 'custom-data-solutions' },
  { label: 'Monsun Academy', value: 'monsun-academy' },
  { label: 'Other Inquiries', value: 'other-inquiries' },
])

const form = ref({
  name: '',
  phone: '',
  email: '',
  company: '',
  service: '',
  message: '',
})

const responseMessage = ref('')
const responseStatus = ref('') // success / error

const sendMessage = async () => {
  responseMessage.value = ''
  responseStatus.value = ''

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })
    const data = await response.json()

    responseMessage.value = data.message
    responseStatus.value = data.status

    if (data.status === 'success') {
      // reset form
      form.value = { name: '', phone: '', email: '', company: '', service: '', message: '' }
    }
  } catch (err) {
    console.error('Error sending message:', err)
    responseMessage.value = 'Failed to send message. Please try again later.'
    responseStatus.value = 'error'
  }

  // Opsional: auto-hide message setelah 5 detik
  setTimeout(() => {
    responseMessage.value = ''
  }, 60000)
}
</script>