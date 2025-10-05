"use client"

import { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

import { SupabaseAuthForm } from "./auth-form"
import { useSupabase } from "./supabase-provider"

export function AuthModalTrigger() {
  const [open, setOpen] = useState(false)
  const { session, loading } = useSupabase()

  useEffect(() => {
    if (session && open) {
      setOpen(false)
    }
  }, [session, open])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button size="sm" className="rounded-full px-5">
          {session ? "Mon espace" : loading ? "Chargement…" : "Créer un compte"}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed inset-0 z-50 grid place-items-center p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95">
          <Dialog.Title className="sr-only">Authentification Letterbook</Dialog.Title>
          <Dialog.Description className="sr-only">
            Connectez-vous ou créez un compte pour accéder à Letterbook.
          </Dialog.Description>
          <div className="relative w-full max-w-md drop-shadow-[0_24px_60px_rgba(15,23,42,0.35)]">
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-white text-neutral-900 shadow-md transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
            <SupabaseAuthForm />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
