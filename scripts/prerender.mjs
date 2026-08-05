#!/usr/bin/env node
/**
 * Post-build static prerender (no headless browser).
 * Writes crawlable HTML per route with meta + main content, plus sitemap and 404.html.
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  readdirSync,
} from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { marked } from 'marked'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dist = join(root, 'dist')
const SITE_URL = 'https://monsun.io'
const SITE_NAME = 'Monsun'
const DEFAULT_DESCRIPTION =
  'Monsun delivers metocean intelligence and consultancy for safer offshore operations — sea state monitoring, marine forecasting, and predictive ocean analytics.'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

function formatDate(value) {
  if (!value) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  const d = new Date(value)
  if (!Number.isNaN(d.getTime()) && String(value).length > 10) {
    return d.toISOString().slice(0, 10)
  }
  return String(value).slice(0, 10)
}

function discoverPosts() {
  const blogDir = join(root, 'src', 'blog')
  return readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(join(blogDir, file), 'utf8')
      const { content, data } = matter(raw)
      const meta = { ...data, date: formatDate(data.date) }
      return {
        slug: file.replace(/\.md$/, ''),
        meta,
        html: marked.parse(content),
      }
    })
    .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

function buildHead({ title, description, path, image, type = 'website', jsonLd = [] }) {
  const url = absoluteUrl(path)
  const img = image
    ? image.startsWith('http')
      ? image
      : absoluteUrl(image)
    : OG_IMAGE
  const scripts = jsonLd
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join('\n    ')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${img}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${img}" />
    ${scripts}
    <script type="module" crossorigin src="${assetJs}"></script>
    <link rel="stylesheet" crossorigin href="${assetCss}">
  </head>`
}

function extractAssets(indexHtml) {
  const js = indexHtml.match(/src="(\/assets\/index-[^"]+\.js)"/)?.[1]
  const css = indexHtml.match(/href="(\/assets\/index-[^"]+\.css)"/)?.[1]
  if (!js || !css) {
    throw new Error('Could not find built JS/CSS assets in dist/index.html')
  }
  return { js, css }
}

let assetJs = ''
let assetCss = ''

function wrapPage(head, bodyInner) {
  return `${head}
  <body>
    <div id="app">${bodyInner}</div>
  </body>
</html>
`
}

function writeRoute(route, html) {
  const outFile =
    route === '/'
      ? join(dist, 'index.html')
      : join(dist, route.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  console.log(`✓ ${route}`)
}

function writeSitemap(routes) {
  const urls = routes
    .map((route) => {
      const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`
      const priority = route === '/' ? '1.0' : route === '/blog' ? '0.8' : '0.7'
      return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  writeFileSync(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
  )
  console.log('✓ sitemap.xml')
}

function homeBody() {
  return `
<header>
  <p><a href="/">Monsun Intelligence</a></p>
</header>
<main>
  <section>
    <h1>Metocean Intelligence for Safer Offshore Decisions</h1>
    <p>${escapeHtml(DEFAULT_DESCRIPTION)}</p>
    <p><a href="/#contact">Consult with Us</a> · <a href="/#services">Explore our Services</a></p>
  </section>
  <section>
    <h2>Metocean Consultancy Services</h2>
    <ul>
      <li><h3>Sea State Monitoring</h3><p>Near real-time metocean analysis of waves, currents, and tides.</p></li>
      <li><h3>Predictive Ocean Analytics</h3><p>AI and numerical models for marine forecasting.</p></li>
      <li><h3>Custom Metocean Data Solutions</h3><p>Tailored ocean data integration and API access.</p></li>
      <li><h3>Monsun Academy</h3><p>Training in Python, metocean modeling, and HPC.</p></li>
    </ul>
  </section>
  <section>
    <h2>Latest from Our Blog</h2>
    <p><a href="/blog">View Monsun Blog</a></p>
  </section>
  <section>
    <h2>About Monsun Metocean Intelligence</h2>
    <p>Monsun is a metocean intelligence company providing accurate sea state information through oceanographic expertise, numerical modeling, and AI.</p>
  </section>
</main>
<footer>
  <p>© Monsun Intelligence · <a href="mailto:contact@monsun.io">contact@monsun.io</a> · <a href="/sitemap.xml">Sitemap</a></p>
</footer>`
}

function blogListBody(posts) {
  const cards = posts
    .map(
      (p) => `
    <article>
      <h2><a href="/blog/${p.slug}">${escapeHtml(p.meta.title)}</a></h2>
      <p>${escapeHtml(p.meta.excerpt || p.meta.description || '')}</p>
    </article>`
    )
    .join('\n')
  return `
<header><p><a href="/">Monsun Intelligence</a></p></header>
<main>
  <h1>Monsun Blog</h1>
  <p>Metocean insights, marine forecasting, and ocean data intelligence from the Monsun consultancy team.</p>
  ${cards}
</main>`
}

function blogPostBody(post) {
  const img = post.meta.image
    ? `<img src="${escapeHtml(post.meta.image)}" alt="${escapeHtml(post.meta.title)}" width="800" height="450" />`
    : ''
  return `
<header><p><a href="/">Monsun Intelligence</a> · <a href="/blog">Blog</a></p></header>
<article>
  <h1>${escapeHtml(post.meta.title)}</h1>
  <p><time datetime="${escapeHtml(post.meta.date || '')}">${escapeHtml(post.meta.date || '')}</time></p>
  ${img}
  ${post.html}
  <p><a href="/blog">← Back to Blog</a></p>
</article>`
}

function organizationSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      alternateName: 'Monsun Intelligence',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      email: 'contact@monsun.io',
      description: DEFAULT_DESCRIPTION,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Monsun Metocean Consultancy',
      url: SITE_URL,
      image: OG_IMAGE,
      description: DEFAULT_DESCRIPTION,
      email: 'contact@monsun.io',
      serviceType: [
        'Metocean intelligence',
        'Metocean consultancy',
        'Sea state monitoring',
        'Marine forecasting',
      ],
    },
  ]
}

function main() {
  if (!existsSync(dist)) {
    console.error('dist/ not found — run vite build first')
    process.exit(1)
  }

  const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8')
  ;({ js: assetJs, css: assetCss } = extractAssets(indexHtml))

  const posts = discoverPosts()
  const routes = ['/', '/blog', ...posts.map((p) => `/blog/${p.slug}`)]
  writeSitemap(routes)

  // Home
  writeRoute(
    '/',
    wrapPage(
      buildHead({
        title: 'Monsun | Metocean Intelligence & Consultancy',
        description: DEFAULT_DESCRIPTION,
        path: '/',
        jsonLd: organizationSchemas(),
      }),
      homeBody()
    )
  )

  // Blog index
  writeRoute(
    '/blog',
    wrapPage(
      buildHead({
        title: 'Monsun Blog | Metocean Insights & Forecasting',
        description:
          'Read Monsun blog articles on metocean consultancy, sea state monitoring, marine forecasting, offshore wind, and ocean data intelligence.',
        path: '/blog',
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
            ],
          },
        ],
      }),
      blogListBody(posts)
    )
  )

  // Blog posts
  for (const post of posts) {
    const path = `/blog/${post.slug}`
    const description =
      post.meta.description || post.meta.excerpt || DEFAULT_DESCRIPTION
    const title = `${post.meta.title} | Monsun Metocean`
    writeRoute(
      path,
      wrapPage(
        buildHead({
          title,
          description,
          path,
          image: post.meta.image,
          type: 'article',
          jsonLd: [
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.meta.title,
              description,
              image: post.meta.image?.startsWith('http')
                ? post.meta.image
                : absoluteUrl(post.meta.image || '/og-image.jpg'),
              datePublished: post.meta.date,
              dateModified: post.meta.date,
              author: { '@type': 'Organization', name: SITE_NAME },
              publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` },
              },
              mainEntityOfPage: absoluteUrl(path),
              inLanguage: 'en',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: post.meta.title,
                  item: absoluteUrl(path),
                },
              ],
            },
          ],
        }),
        blogPostBody(post)
      )
    )
  }

  copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
  console.log('✓ 404.html')
  console.log(`Prerendered ${routes.length} routes`)
}

main()
