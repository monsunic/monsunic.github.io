import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from '../config/site.js'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Monsun Intelligence',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    email: CONTACT_EMAIL,
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressCountry: 'ID',
    },
    sameAs: ['https://linkedin.com/company/monsunic'],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { '@type': 'Organization', name: SITE_NAME },
  }
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Monsun Metocean Consultancy',
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    description: DEFAULT_DESCRIPTION,
    email: CONTACT_EMAIL,
    areaServed: 'Worldwide',
    serviceType: [
      'Metocean intelligence',
      'Metocean consultancy',
      'Sea state monitoring',
      'Marine forecasting',
      'Offshore metocean services',
    ],
  }
}

export function blogPostingSchema({ title, description, image, date, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image?.startsWith('http') ? image : absoluteUrl(image || '/og-image.jpg'),
    datePublished: date,
    dateModified: date,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.ico` },
    },
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: 'en',
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
