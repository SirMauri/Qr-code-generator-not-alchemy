import { Metadata } from 'next'

/**
 * SEO Utilities and JSON-LD Schema Generators
 * Optimized for both traditional search engines and AI-powered search (GEO)
 */

const SITE_URL = 'https://qr-generator.com' // TODO: Replace with actual domain
const SITE_NAME = 'Free QR Code Generator'

// ===== METADATA GENERATORS =====

export function generateMetadata(params?: {
  title?: string
  description?: string
  path?: string
  locale?: string
}): Metadata {
  const {
    title = 'Free QR Code Generator | No Paywalls, No Limits',
    description = 'Generate beautiful, customizable QR codes for free. No paywalls, no watermarks, no limitations. Choose colors, formats, and download instantly.',
    path = '',
    locale = 'en',
  } = params || {}

  const url = `${SITE_URL}${path}`
  const ogImage = `${SITE_URL}/logo.png`

  return {
    title,
    description,
    keywords: [
      'QR code generator',
      'free QR code',
      'customizable QR code',
      'no paywall',
      'no watermark',
      'QR code maker',
      'generate QR code',
      'PNG QR code',
      'SVG QR code',
      'JPG QR code',
      'custom colors',
      'QR code online',
      'QR generator tool',
    ],
    authors: [{ name: 'Free QR Code Generator' }],
    creator: 'Free QR Code Generator',
    publisher: 'Free QR Code Generator',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Free QR Code Generator - Generate customizable QR codes instantly',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@yourhandle', // TODO: Add actual Twitter handle if available
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}`,
        'es': `${SITE_URL}/es`,
        'pt': `${SITE_URL}/pt`,
        'fr': `${SITE_URL}/fr`,
        'de': `${SITE_URL}/de`,
      },
    },
    verification: {
      google: 'your-google-verification-code', // TODO: Add Google Search Console verification
      // yandex: 'your-yandex-verification-code', // Optional
      // bing: 'your-bing-verification-code', // Optional
    },
  }
}

// ===== JSON-LD SCHEMA GENERATORS =====

/**
 * WebApplication Schema - Primary schema for the tool
 * Critical for GEO: AI engines use this to understand what your app does
 */
export function generateWebApplicationSchema(locale = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free QR Code Generator',
    url: SITE_URL,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Modern browser recommended.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Generate QR codes for URLs, text, and more',
      'Customize foreground and background colors',
      'Export as PNG, SVG, or JPG',
      'No watermarks or limitations',
      'No sign-up required',
      'Client-side generation for privacy',
      'Instant download',
      'Free forever',
    ],
    screenshot: `${SITE_URL}/logo.png`,
    softwareVersion: '1.0',
    softwareHelp: {
      '@type': 'CreativeWork',
      url: `${SITE_URL}#faq`,
    },
    inLanguage: locale,
    description: 'Generate beautiful, customizable QR codes for free. No paywalls, no watermarks, no limitations. Choose colors, formats, and download instantly.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '1',
      bestRating: '5',
    },
  }
}

/**
 * Organization Schema - Brand identity
 * Important for GEO: Helps AI engines understand who you are
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Free QR Code Generator',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Open-source, free QR code generator with no paywalls or limitations.',
    sameAs: [
      // TODO: Add social media links when available
      // 'https://twitter.com/yourhandle',
      // 'https://github.com/yourrepo',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: SITE_URL,
    },
  }
}

/**
 * FAQPage Schema - For FAQ section
 * Critical for GEO: AI engines heavily favor FAQ structured data
 */
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I create a QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Creating a QR code is simple: 1) Enter your URL or text in the input field, 2) Customize the foreground and background colors if desired, 3) Select your preferred format (PNG, SVG, or JPG), 4) Click the Generate button, 5) Download your QR code instantly. No sign-up or payment required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this QR code generator really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, this QR code generator is completely free forever. Unlike other QR code tools, we don\'t charge for basic features, add watermarks, require sign-ups, or limit the number of QR codes you can create. All features are available to everyone at no cost.',
        },
      },
      {
        '@type': 'Question',
        name: 'What formats can I download my QR code in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can download your QR code in three formats: PNG (best for web and digital use), SVG (vector format, best for print and scaling), and JPG (compressed format, smaller file size). Choose the format that best suits your needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I customize the colors of my QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! You can customize both the foreground (dark squares) and background (light area) colors of your QR code. Use the color pickers to choose any color you want, or enter a hex code directly. Make sure there\'s enough contrast between colors for reliable scanning.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are there any watermarks on the generated QR codes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, there are no watermarks whatsoever. Your QR codes are completely clean and professional. You can use them for commercial purposes, print materials, business cards, or any other use case without any branding from our tool.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data safe? Do you collect information?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your data is completely safe because we don\'t collect it. All QR code generation happens locally in your browser (client-side). Your URLs and content never leave your device. We don\'t store, track, or have access to any information you enter.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use these QR codes for commercial purposes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can use the QR codes generated by this tool for any purpose, including commercial use. There are no restrictions or licenses required. Use them in your business, marketing materials, products, or anywhere else you need.',
        },
      },
      {
        '@type': 'Question',
        name: 'What\'s the difference between PNG, SVG, and JPG formats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PNG is a lossless format ideal for digital use with transparent backgrounds if needed. SVG is a vector format that can scale to any size without losing quality, perfect for printing. JPG is a compressed format with smaller file sizes, good for web use where file size matters. We recommend PNG for most digital uses and SVG for print.',
        },
      },
    ],
  }
}

/**
 * HowTo Schema - For step-by-step instructions
 * Good for GEO: Helps AI engines understand how to use the tool
 */
export function generateHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a QR Code',
    description: 'Step-by-step guide to creating a customizable QR code for free.',
    totalTime: 'PT1M', // 1 minute
    tool: {
      '@type': 'HowToTool',
      name: 'Free QR Code Generator',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Enter your URL or text',
        text: 'Type or paste the URL or text you want to encode in the QR code into the input field.',
        url: `${SITE_URL}#step-1`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Customize colors and format',
        text: 'Use the color pickers to customize the foreground and background colors. Select your preferred export format: PNG, SVG, or JPG.',
        url: `${SITE_URL}#step-2`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Generate and download',
        text: 'Click the Generate button to create your QR code. Once generated, click the download button to save your QR code in your chosen format.',
        url: `${SITE_URL}#step-3`,
      },
    ],
  }
}

/**
 * BreadcrumbList Schema - Even for single page, helps with navigation understanding
 * Good for SEO: Helps search engines understand site structure
 */
export function generateBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
    ],
  }
}

/**
 * Combine all schemas into a single JSON-LD script
 * This is the main function to use in your layout
 */
export function generateAllSchemas(locale = 'en') {
  return {
    '@graph': [
      generateWebApplicationSchema(locale),
      generateOrganizationSchema(),
      generateFAQSchema(),
      generateHowToSchema(),
      generateBreadcrumbSchema(),
    ],
  }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Generate hreflang links for international SEO
 */
export function generateHreflangLinks() {
  const languages = ['en', 'es', 'pt', 'fr', 'de']
  return languages.map((lang) => ({
    hrefLang: lang,
    href: lang === 'en' ? SITE_URL : `${SITE_URL}/${lang}`,
  }))
}

/**
 * Get canonical URL for a given path and locale
 */
export function getCanonicalUrl(path = '', locale = 'en') {
  const localePath = locale === 'en' ? '' : `/${locale}`
  return `${SITE_URL}${localePath}${path}`
}
