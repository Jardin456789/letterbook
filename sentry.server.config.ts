import * as Sentry from "@sentry/nextjs"

const dsn = process.env.SENTRY_DSN

Sentry.init({
  dsn: dsn || undefined,
  enabled: process.env.NODE_ENV === "production" && Boolean(dsn),
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0),
})
