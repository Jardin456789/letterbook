import { cookies } from "next/headers"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables",
    )
  }

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        ;(
          cookieStore as unknown as {
            set: (options: CookieOptions & { name: string; value: string }) => void
          }
        ).set({ name, value, ...options })
      },
      remove(name: string, options: CookieOptions) {
        ;(
          cookieStore as unknown as {
            delete: (options: CookieOptions & { name: string }) => void
          }
        ).delete({ name, ...options })
      },
    },
  })
}
