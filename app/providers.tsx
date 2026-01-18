'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  
  if (posthogKey && posthogHost) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: 'identified_only',
    })
  }
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
    // Only use PostHogProvider if PostHog is initialized
    if (typeof window !== 'undefined' && posthog.__loaded) {
      return <PostHogProvider client={posthog}>{children}</PostHogProvider>
    }
    // Return children without provider if PostHog is not configured
    return <>{children}</>
}
