import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://qr-generator.com' // TODO: Replace with actual domain

  // Supported languages for i18n
  const languages = ['en', 'es', 'pt', 'fr', 'de']

  // Generate sitemap entries for each language
  const languageUrls = languages.map((lang) => ({
    url: lang === 'en' ? baseUrl : `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: lang === 'en' ? 1.0 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        languages.map((l) => [
          l,
          l === 'en' ? baseUrl : `${baseUrl}/${l}`,
        ])
      ),
    },
  }))

  return languageUrls
}
