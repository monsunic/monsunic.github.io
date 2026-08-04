<template>
  <!-- Section: Our Outreach -->
  <section
    id="outreach"
    class="relative overflow-hidden bg-gradient-to-b from-transparent via-blue-50/60 to-white py-20 sm:py-28 scroll-mt-[0vh]"
  >
    <!-- Header -->
    <div
      class="max-w-3xl mx-auto text-center px-6 sm:px-8 mb-16"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <h2 class="text-3xl sm:text-5xl font-bold text-blue-900 mb-6">
        Discover Our Outreach
      </h2>
      <p class="text-gray-700 text-lg sm:text-xl leading-relaxed">
        Explore our commitment to accessible ocean knowledge through Monsun Labs, our free and open-source learning platform, and Monsun Forecast, providing reliable ocean state predictions at no cost. 
      </p>
    </div>

    <!-- Outreach Cards -->
    <div
      class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-6 sm:px-8"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <!-- Monsun Labs -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <h3 class="text-xl font-semibold text-blue-800 mb-4">
            Monsun Labs
          </h3>
          <p class="text-gray-600 leading-relaxed mb-6">
            Our free, open-source learning platform that democratizes ocean science knowledge,
            offering educational resources, tutorials, and datasets to students, researchers,
            and ocean enthusiasts worldwide.
          </p>
        </div>
        <a
          href="https://monsun-labs.github.io"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-700 font-medium inline-flex items-center group"
        >
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <!-- Monsun Forecast -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <h3 class="text-xl font-semibold text-blue-800 mb-4">
            Monsun Forecast
          </h3>
          <p class="text-gray-600 leading-relaxed mb-6">
            Monsun Forecast provides accurate ocean state predictions sourced from worldwide national weather agencies. This service empowers users with essential insights for informed decision-making in ocean-related activities.
          </p>
        </div>
        <a
          href="https://monsunic.github.io/monsun-forecast"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-700 font-medium inline-flex items-center group"
        >
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// Minimal setup — AOS animation and Tailwind handle the layout
</script>
