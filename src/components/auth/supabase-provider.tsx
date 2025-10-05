"use client"

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Session, SupabaseClient } from "@supabase/supabase-js"

import { createSupabaseBrowserClient } from "@/lib/supabase/client"

interface SupabaseContextValue {
  supabase: SupabaseClient
  session: Session | null
  loading: boolean
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined)

interface SupabaseProviderProps {
  children: ReactNode
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [supabase] = useState(() => createSupabaseBrowserClient())
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!isMounted) {
        return
      }

      setSession(session ?? null)
      setLoading(false)
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, authSession) => {
      setSession(authSession ?? null)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  const value = useMemo(() => ({ supabase, session, loading }), [supabase, session, loading])

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>
}

export function useSupabase() {
  const context = useContext(SupabaseContext)

  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }

  return context
}
