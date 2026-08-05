import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import matter from 'gray-matter'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // ✅ Only handle .vue files here — exclude .md
    vue({
      include: [/\.vue$/],
    }),

    tailwindcss(),

    // ✅ Custom Markdown loader (handles frontmatter + raw content)
    {
      name: 'markdown-loader',
      transform(src, id) {
        if (id.endsWith('.md')) {
          const { content, data } = matter(src)
          if (data.date instanceof Date) {
            data.date = data.date.toISOString().slice(0, 10)
          }
          return `
            export const frontmatter = ${JSON.stringify(data)};
            export default ${JSON.stringify(content)};
          `
        }
      },
    },
  ],

  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@blog': fileURLToPath(new URL('./src/blog', import.meta.url)),
    },
  },

  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['all'],
    // optional: disable overlay if it becomes annoying
    // hmr: { overlay: false },
  },
})