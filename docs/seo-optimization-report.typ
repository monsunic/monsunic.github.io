// Monsun SEO Optimization Report (Typst)
#set document(
  title: "Monsun SEO Optimization Report",
  author: "Monsun Intelligence",
  date: datetime(year: 2026, month: 8, day: 5),
)

#set page(
  paper: "a4",
  margin: (x: 2.2cm, y: 2.4cm),
  footer: context [
    #set text(size: 8.5pt, fill: rgb("#64748b"))
    #line(length: 100%, stroke: 0.4pt + rgb("#e2e8f0"))
    #v(0.35em)
    #grid(
      columns: (1fr, auto),
      [Monsun · SEO Optimization Report],
      [#counter(page).display("1 / 1", both: true)],
    )
  ],
)

#set text(font: "DejaVu Sans", size: 10.5pt, fill: rgb("#0f172a"))
#set par(justify: true, leading: 0.75em)
#set heading(numbering: "1.1")

#show heading.where(level: 1): it => {
  set text(size: 14pt, weight: "bold", fill: rgb("#0c4a6e"))
  block(above: 1.4em, below: 0.7em)[
    #it
    #v(0.15em)
    #line(length: 100%, stroke: 1pt + rgb("#0284c7"))
  ]
}

#show heading.where(level: 2): it => {
  set text(size: 12pt, weight: "bold", fill: rgb("#075985"))
  block(above: 1.1em, below: 0.45em, it)
}

#show link: set text(fill: rgb("#0369a1"))

#let pill(body, fill: rgb("#e0f2fe"), stroke: rgb("#0284c7")) = box(
  fill: fill,
  stroke: 0.6pt + stroke,
  radius: 3pt,
  inset: (x: 7pt, y: 3pt),
  text(size: 8.5pt, weight: "semibold", fill: stroke, body),
)

#let kv(k, v) = grid(
  columns: (3.2cm, 1fr),
  column-gutter: 0.6em,
  text(weight: "bold", fill: rgb("#334155"), k),
  v,
)

// Cover
#align(center)[
  #v(1.2cm)
  #text(size: 11pt, fill: rgb("#0284c7"), weight: "semibold", tracking: 1.2pt)[MONSUN INTELLIGENCE]
  #v(0.6em)
  #text(size: 26pt, weight: "bold", fill: rgb("#0c4a6e"))[SEO Optimization Report]
  #v(0.45em)
  #text(size: 12pt, fill: rgb("#475569"))[Technical & On-Page SEO for #link("https://monsun.io")[monsun.io]]
  #v(1em)
  #line(length: 40%, stroke: 1.2pt + rgb("#0284c7"))
  #v(1em)
  #grid(
    columns: (auto, auto, auto),
    column-gutter: 1.2em,
    pill[Status: Deployed],
    pill(fill: rgb("#ecfdf5"), stroke: rgb("#059669"))[Canonical: monsun.io],
    pill(fill: rgb("#eef2ff"), stroke: rgb("#4338ca"))[GSC: Submitted],
  )
  #v(1.4em)
  #block(
    width: 85%,
    fill: rgb("#f8fafc"),
    stroke: 0.6pt + rgb("#e2e8f0"),
    radius: 6pt,
    inset: 14pt,
    align(left)[
      #kv[Site][#link("https://monsun.io")[https://monsun.io]]
      #v(0.35em)
      #kv[Brand][Monsun · Metocean Intelligence & Consultancy]
      #v(0.35em)
      #kv[Report date][5 August 2026]
      #v(0.35em)
      #kv[Scope][Technical SEO, on-page structure, content depth, discovery assets]
      #v(0.35em)
      #kv[Deploy branch][`dev` → GitHub Pages (`main`)]
    ],
  )
]

#v(1.5cm)

#outline(title: [Contents], indent: 1em)

#pagebreak()

= Executive summary

This report documents the SEO optimization work completed for *Monsun* on #link("https://monsun.io")[monsun.io]. The site was a Vue 3 + Vite client-side SPA with almost no SEO infrastructure. After the optimization pass, the live site ships crawlable HTML, keyword-aligned copy, discovery files, structured data, and expanded metocean content.

#block(
  width: 100%,
  fill: rgb("#f0f9ff"),
  stroke: 0.6pt + rgb("#bae6fd"),
  radius: 5pt,
  inset: 12pt,
)[
  *Verdict:* Technical and on-page SEO foundations are *deployed and verified* on production. Google Search Console has already been submitted; discoverability in organic search may still take days to weeks while Google crawls and indexes the new pages.
]

#v(0.6em)

*Primary keyword targets*
- metocean intelligence
- metocean consultancy / consulting / services
- sea state monitoring, marine forecasting, offshore metocean
- Related long-tail: AI ocean forecasting, offshore wind metocean, satellite ocean data

= Baseline (before)

#figure(
  table(
    columns: (1.8fr, 1.4fr, 1.8fr),
    inset: 8pt,
    align: left,
    stroke: 0.5pt + rgb("#cbd5e1"),
    fill: (x, y) => if y == 0 { rgb("#0c4a6e") } else if calc.odd(y) { rgb("#f8fafc") },
    table.header(
      text(fill: white, weight: "bold")[Area],
      text(fill: white, weight: "bold")[Before],
      text(fill: white, weight: "bold")[Impact],
    ),
    [Crawlability], [Client-only SPA shell], [Crawlers saw empty `#app`],
    [Title / meta], [`Monsun` only], [Weak SERP & social previews],
    [Discovery], [No robots / sitemap], [Hard for Google to discover URLs],
    [Structured data], [None], [No rich Organization / Article signals],
    [Headings], [Duplicate H1s], [Diluted topical focus],
    [Hero copy], [Generic "data-driven insights"], [Missed primary keywords],
    [Blog depth], [~80–100 words / post], [Thin content risk],
    [Images], [Broken `/blog-images`, ~1.9MB hero], [Weak UX + LCP risk],
    [Domain], [Custom domain live], [CNAME file missing in repo deploys],
  ),
  caption: [SEO gaps identified before the optimization pass.],
)

= Work completed

== Crawlability & domain

- Static *prerender* of `/`, `/blog`, and all blog post URLs at build time (`scripts/prerender.mjs`)
- GitHub Pages SPA fallback via `404.html`
- Canonical origin locked to `https://monsun.io`
- `public/CNAME` with `monsun.io` so orphan `main` deploys keep the custom domain binding
- Build pipeline: `npm run build` = Vite build + prerender + sitemap generation

== Technical head & discovery

#figure(
  table(
    columns: (1.4fr, 2.6fr),
    inset: 8pt,
    align: left,
    stroke: 0.5pt + rgb("#cbd5e1"),
    fill: (x, y) => if y == 0 { rgb("#0c4a6e") } else if calc.odd(y) { rgb("#f8fafc") },
    table.header(
      text(fill: white, weight: "bold")[Asset],
      text(fill: white, weight: "bold")[Implementation],
    ),
    [Titles], [Home / blog / posts with Monsun + metocean framing],
    [Meta description], [Unique ~150–160 char descriptions per route],
    [Canonical], [`https://monsun.io/...` per page],
    [Open Graph / Twitter], [title, description, url, image (`og-image.jpg`)],
    [robots.txt], [Allow all · points to sitemap],
    [sitemap.xml], [Generated at build from routes + blog markdown],
    [JSON-LD], [Organization, WebSite, ProfessionalService, BlogPosting, BreadcrumbList],
    [Favicon], [Correct `image/x-icon` + apple-touch-icon],
    [Runtime SEO], [`@unhead/vue` + `useSeo` for client route updates],
  ),
  caption: [Technical SEO assets now present on production.],
)

== On-page structure & brand

- Removed duplicate Header/H1 on home (logo is brand text, not H1)
- Hero H1: *Metocean Intelligence for Safer Offshore Decisions*
- Supporting copy names Monsun + metocean consultancy
- Services / About rewritten around metocean consultancy & intelligence
- Footer email aligned to `contact@monsun.io`
- Labs / Forecast links updated to `https://labs.monsun.io` and `https://forecast.monsun.io`
- Internal links: sitemap → `/sitemap.xml`, services CTAs → contact

== Content depth

*Expanded existing posts* and added three pillar articles:

#figure(
  table(
    columns: (2.4fr, 1.6fr),
    inset: 7pt,
    align: left,
    stroke: 0.5pt + rgb("#cbd5e1"),
    fill: (x, y) => if y == 0 { rgb("#0c4a6e") } else if calc.odd(y) { rgb("#f8fafc") },
    table.header(
      text(fill: white, weight: "bold")[URL path],
      text(fill: white, weight: "bold")[Role],
    ),
    [`/blog/what-is-metocean-consultancy`], [Pillar · commercial intent],
    [`/blog/metocean-intelligence-for-offshore-operations`], [Pillar · category intent],
    [`/blog/sea-state-monitoring-best-practices`], [Pillar · capability intent],
    [`/blog/harnessing-ocean-data-with-ai`], [Expanded · AI / forecasting],
    [`/blog/open-data-coastal-management`], [Expanded · coastal / open data],
    [`/blog/offshore-wind-forecasting`], [Expanded · offshore wind],
    [`/blog/satellite-data-integration`], [Expanded · satellite metocean],
  ),
  caption: [Blog inventory after content expansion.],
)

Frontmatter now includes `description` (and related fields) for Unhead + Article schema.

== Performance & media

- Compressed hero image (~50KB JPEG)
- Added `/public/blog-images/*` covers (paths resolve)
- OG share image at `/og-image.jpg`
- Lazy-loading on below-fold blog cards

= Live verification

Checked after deploy to production:

#figure(
  table(
    columns: (1.6fr, 1fr, 2fr),
    inset: 8pt,
    align: left,
    stroke: 0.5pt + rgb("#cbd5e1"),
    fill: (x, y) => if y == 0 { rgb("#0c4a6e") } else if calc.odd(y) { rgb("#f8fafc") },
    table.header(
      text(fill: white, weight: "bold")[Check],
      text(fill: white, weight: "bold")[Result],
      text(fill: white, weight: "bold")[Evidence],
    ),
    [Homepage title], [Pass], [`Monsun | Metocean Intelligence & Consultancy`],
    [Prerendered H1 in HTML], [Pass], [Visible without JS execution],
    [JSON-LD present], [Pass], [Organization / WebSite / ProfessionalService],
    [`/robots.txt`], [Pass], [HTTP 200 · sitemap reference],
    [`/sitemap.xml`], [Pass], [HTTP 200 · all key URLs listed],
    [`site:monsun.io` on Google], [Pending], [Awaiting crawl/index after GSC submit],
    ["monsun metocean" SERP], [Pending], [Competitors only — normal until indexed + ranked],
    [Google Search Console], [Done], [Property + sitemap submitted by team],
  ),
  caption: [Production verification status as of report date.],
)

= Sitemap update behaviour

The sitemap is *build-time generated*, not a runtime API.

+ New blog post (`.md` under `src/blog/`)
+ Push to `dev` → GitHub Actions build
+ `scripts/prerender.mjs` rediscovers slugs and rewrites `sitemap.xml`
+ Deploy ships the updated file to `https://monsun.io/sitemap.xml`

Without rebuild/deploy, the live sitemap does not change automatically.

= Google Search Console & discoverability

Search Console for `monsun.io` has already been submitted (property + sitemap). That does *not* mean pages appear in Google search immediately.

Typical timeline:

1. *Crawl* — Googlebot fetches URLs from the sitemap / links
2. *Index* — pages enter Google's index (`site:monsun.io` starts showing results)
3. *Rank* — pages compete for queries such as "monsun metocean" and broader metocean terms

#block(
  width: 100%,
  fill: rgb("#eef2ff"),
  stroke: 0.6pt + rgb("#a5b4fc"),
  radius: 5pt,
  inset: 12pt,
)[
  *Expectation:* Indexing often takes *days to a few weeks*. Ranking for competitive metocean terms takes longer and depends on content freshness, internal links, and external mentions. Re-check periodically with `site:monsun.io` and Search Console *Coverage / Pages* reports.
]

Monitor in Search Console: sitemap status, indexing issues, Core Web Vitals, and which queries begin to impress after indexation.

= Key repository files

#figure(
  table(
    columns: (1.5fr, 2.5fr),
    inset: 7pt,
    align: left,
    stroke: 0.5pt + rgb("#cbd5e1"),
    fill: (x, y) => if y == 0 { rgb("#0c4a6e") } else if calc.odd(y) { rgb("#f8fafc") },
    table.header(
      text(fill: white, weight: "bold")[Path],
      text(fill: white, weight: "bold")[Role],
    ),
    [`scripts/prerender.mjs`], [Static HTML prerender + sitemap + 404],
    [`public/CNAME`], [Persist `monsun.io` on Pages deploy],
    [`public/robots.txt`], [Crawl policy + sitemap pointer],
    [`src/config/site.js`], [Site URL / defaults],
    [`src/composables/useSeo.js`], [Client-side head management],
    [`src/seo/schemas.js`], [JSON-LD helpers],
    [`src/blog/*.md`], [Content + SEO frontmatter],
    [`index.html`], [Baseline meta / OG bootstrap],
  ),
  caption: [Primary implementation touchpoints.],
)

= Recommendations for future improvements

Prioritized next steps beyond the current foundation:

== Content & topical authority

- Publish 1–2 new metocean articles per month targeting long-tail queries (e.g. monsoon wave forecasting, port operability, Indonesian / SEA offshore case studies)
- Add author/expert bios and "last updated" dates on pillar posts
- Build a simple topic cluster: each pillar post links to related services + sibling posts with natural anchor text
- Create dedicated landing copy for high-intent phrases if traffic justifies it (e.g. standalone metocean consultancy page)

== International & regional reach

- Add multilingual routes (`id`, `zh`, and other SEA locales) with `hreflang` once English rankings stabilize
- Localize pillar posts first (not only UI chrome) so regional SERPs can rank native-language pages

== Technical evolution

- Consider SSG/SSR (Astro or Nuxt) if content volume and team workflow grow — cleaner HTML, simpler i18n, stronger Core Web Vitals control
- Convert remaining large assets to WebP/AVIF with `srcset`; keep measuring LCP on mobile
- Add FAQ schema on consultancy / services sections where Q&A content exists
- Ensure every new deploy still ships `CNAME` so GitHub Pages custom-domain settings are not wiped

== Measurement & iteration

- Review Search Console weekly for 4–6 weeks after submission: indexed page count, sitemap errors, query impressions
- Track branded vs non-branded queries ("Monsun" vs "metocean consultancy")
- Set lightweight goals in analytics (contact form submissions from organic sessions)

== Authority & distribution

- Share pillar posts via LinkedIn (`monsunic`), partner pages, and Monsun Labs / Forecast with contextual links back to `monsun.io`
- Pursue industry citations (guest notes, conference pages, open-data acknowledgements) rather than generic directory spam
- Keep Labs (`labs.monsun.io`) and Forecast (`forecast.monsun.io`) interlinked with clear brand + keyword anchors

= Conclusion

Monsun's public site now has a solid SEO foundation: crawlable pages, correct `monsun.io` canonicals, discovery files, structured data, keyword-led homepage, and deeper metocean content. Search Console is already submitted — the next phase is waiting for crawl/index, then compounding with content, measurement, and authority building.

#v(1.2em)
#align(center)[
  #text(size: 9pt, fill: rgb("#64748b"))[
    Prepared for Monsun Intelligence · #link("https://monsun.io")[monsun.io] · August 2026
  ]
]
