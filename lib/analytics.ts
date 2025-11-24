/**
 * Google Analytics 4 Helper Functions
 *
 * This file provides type-safe helper functions for tracking custom events in GA4.
 * Make sure to set NEXT_PUBLIC_GA_ID in your .env.local file.
 */

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

// Custom event types for QR Generator
export type QRGeneratorEvent =
  | 'qr_generated'
  | 'qr_download'
  | 'format_selected'
  | 'color_customized'
  | 'generation_error'
  | 'faq_expanded'
  | 'use_case_viewed'

interface EventParams {
  [key: string]: string | number | boolean | undefined
}

/**
 * Track a custom event in Google Analytics 4
 * @param eventName - The name of the event to track
 * @param params - Additional parameters for the event
 */
export function trackEvent(eventName: QRGeneratorEvent, params?: EventParams) {
  // Only track if GA4 is configured
  if (typeof window === 'undefined' || !window.gtag) {
    console.debug(`GA4 not available, would track: ${eventName}`, params)
    return
  }

  try {
    window.gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error tracking GA4 event:', error)
  }
}

/**
 * Track QR code generation
 * @param format - The format selected (PNG, SVG, JPG)
 * @param hasCustomColors - Whether custom colors were used
 */
export function trackQRGeneration(format: string, hasCustomColors: boolean) {
  trackEvent('qr_generated', {
    format,
    has_custom_colors: hasCustomColors,
  })
}

/**
 * Track QR code download
 * @param format - The format downloaded (PNG, SVG, JPG)
 */
export function trackQRDownload(format: string) {
  trackEvent('qr_download', {
    format,
  })
}

/**
 * Track format selection change
 * @param format - The format selected (PNG, SVG, JPG)
 */
export function trackFormatChange(format: string) {
  trackEvent('format_selected', {
    format,
  })
}

/**
 * Track color customization
 * @param colorType - Whether it's foreground or background color
 */
export function trackColorChange(colorType: 'foreground' | 'background') {
  trackEvent('color_customized', {
    color_type: colorType,
  })
}

/**
 * Track generation errors
 * @param errorMessage - The error message or type
 */
export function trackGenerationError(errorMessage: string) {
  trackEvent('generation_error', {
    error_message: errorMessage,
  })
}

/**
 * Track FAQ item expansion
 * @param question - The FAQ question that was expanded
 */
export function trackFAQExpansion(question: string) {
  trackEvent('faq_expanded', {
    question,
  })
}

/**
 * Track use case card interactions
 * @param useCaseTitle - The title of the use case viewed
 */
export function trackUseCaseView(useCaseTitle: string) {
  trackEvent('use_case_viewed', {
    use_case: useCaseTitle,
  })
}

/**
 * Track page views (automatically handled by GA4 script in layout.tsx)
 * This function is provided for manual page view tracking if needed
 * @param url - The URL to track
 * @param title - The page title
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (!gaId) {
    return
  }

  try {
    window.gtag('config', gaId, {
      page_path: url,
      page_title: title,
    })
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

/**
 * Check if Google Analytics is properly configured
 * @returns boolean indicating if GA4 is available
 */
export function isAnalyticsAvailable(): boolean {
  return typeof window !== 'undefined' &&
         typeof window.gtag === 'function' &&
         !!process.env.NEXT_PUBLIC_GA_ID
}
