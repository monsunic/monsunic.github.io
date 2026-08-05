import { useHead } from '@unhead/vue'
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from '../config/site.js'

/**
 * Apply page-level SEO head tags (title, description, canonical, OG, Twitter, JSON-LD).
 * @param {object|import('vue').Ref|import('vue').ComputedRef} input
 */
export function useSeo(input) {
  useHead(() => {
    const seo = typeof input === 'function' ? input() : (input?.value ?? input)
    if (!seo) return {}

    const title = seo.title || `${SITE_NAME} | Metocean Intelligence & Consultancy`
    const description = seo.description || DEFAULT_DESCRIPTION
    const path = seo.path || '/'
    const url = absoluteUrl(path)
    const image = seo.image
      ? seo.image.startsWith('http')
        ? seo.image
        : absoluteUrl(seo.image)
      : DEFAULT_OG_IMAGE
    const type = seo.type || 'website'

    const meta = [
      { name: 'description', content: description },
      { name: 'robots', content: seo.robots || 'index, follow' },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ]

    const link = [{ rel: 'canonical', href: url }]

    const script = []
    if (seo.jsonLd) {
      const schemas = Array.isArray(seo.jsonLd) ? seo.jsonLd : [seo.jsonLd]
      for (const schema of schemas) {
        script.push({
          type: 'application/ld+json',
          children: JSON.stringify(schema),
        })
      }
    }

    return { title, meta, link, script }
  })
}
