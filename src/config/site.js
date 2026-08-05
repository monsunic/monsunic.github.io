export const SITE_URL = 'https://monsun.io'
export const SITE_NAME = 'Monsun'
export const SITE_TAGLINE = 'Metocean Intelligence & Consultancy'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const CONTACT_EMAIL = 'contact@monsun.io'

export const DEFAULT_DESCRIPTION =
  'Monsun delivers metocean intelligence and consultancy for safer offshore operations — sea state monitoring, marine forecasting, and predictive ocean analytics.'

/** Blog slugs discovered from src/blog — keep in sync when adding posts */
export const BLOG_SLUGS = [
  'what-is-metocean-consultancy',
  'metocean-intelligence-for-offshore-operations',
  'sea-state-monitoring-best-practices',
  'harnessing-ocean-data-with-ai',
  'open-data-coastal-management',
  'offshore-wind-forecasting',
  'satellite-data-integration',
]

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}
