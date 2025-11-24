import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Free QR Code Generator - No Paywalls, No Limits',
    short_name: 'QR Generator',
    description: 'Generate beautiful, customizable QR codes for free. No paywalls, no watermarks, no limitations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F7F0', // --background from globals.css
    theme_color: '#284023', // --primary from globals.css
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['utilities', 'productivity', 'business'],
    lang: 'en',
    dir: 'ltr',
  }
}
