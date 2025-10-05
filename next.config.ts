import type { NextConfig } from "next"
import { withSentryConfig } from "@sentry/nextjs"

const nextConfig: NextConfig = {
  typedRoutes: true,
}

const sentryWebpackPluginOptions = {
  silent: true,
}

const withSentry = withSentryConfig as unknown as (
  config: NextConfig,
  sentryOptions: typeof sentryWebpackPluginOptions,
  runtimeOptions?: Record<string, unknown>,
) => NextConfig

export default withSentry(nextConfig, sentryWebpackPluginOptions, {
  hideSourceMaps: true,
})
