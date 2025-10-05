"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSupabase } from "./supabase-provider"

const authSchema = z.object({
  email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide." }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." })
    .max(72, { message: "Le mot de passe doit contenir moins de 72 caractères." }),
})

type AuthFormValues = z.infer<typeof authSchema>

type AuthMode = "signin" | "signup"

export function SupabaseAuthForm() {
  const { supabase, session, loading } = useSupabase()
  const [mode, setMode] = useState<AuthMode>("signin")
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [signingOut, setSigningOut] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: AuthFormValues) {
    setSubmitError(null)
    setSubmitSuccess(null)

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword(values)

      if (error) {
        setSubmitError(error.message)
        return
      }

      setSubmitSuccess("Connexion réussie.")
      reset({ ...values, password: "" })
      return
    }

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    })

    if (error) {
      setSubmitError(error.message)
      return
    }

    setSubmitSuccess(
      "Compte créé. Vérifiez votre boîte mail pour confirmer votre inscription avant de vous connecter.",
    )
    reset({ email: values.email, password: "" })
    setMode("signin")
  }

  async function handleSignOut() {
    setSubmitError(null)
    setSubmitSuccess(null)
    setSigningOut(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      setSubmitError(error.message)
      setSigningOut(false)
      return
    }

    setSubmitSuccess("Déconnexion réussie.")
    setSigningOut(false)
  }

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Espace sécurisé</CardTitle>
          <CardDescription>Chargement de votre session…</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (session) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Vous êtes connecté</CardTitle>
          <CardDescription>{session.user.email ?? "Compte Supabase"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}
          {submitSuccess ? <p className="text-sm text-primary">{submitSuccess}</p> : null}
          <Button onClick={handleSignOut} disabled={signingOut} className="w-full">
            {signingOut ? "Déconnexion en cours…" : "Se déconnecter"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === "signin" ? "Connexion" : "Créer un compte"}</CardTitle>
        <CardDescription>
          {mode === "signin"
            ? "Accédez à votre espace Letterbook avec vos identifiants."
            : "Inscrivez-vous pour commencer à collaborer avec votre équipe."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Adresse e-mail
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="nom@exemple.com"
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="••••••••"
              disabled={isSubmitting}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            ) : null}
          </div>

          {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}
          {submitSuccess ? <p className="text-sm text-primary">{submitSuccess}</p> : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? "Veuillez patienter…"
              : mode === "signin"
                ? "Se connecter"
                : "Créer un compte"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "signin" ? "Pas encore de compte ? " : "Déjà inscrit ? "}
          <button
            type="button"
            className="font-semibold text-primary hover:text-primary/80"
            onClick={() => {
              setSubmitError(null)
              setSubmitSuccess(null)
              setMode(mode === "signin" ? "signup" : "signin")
            }}
          >
            {mode === "signin" ? "Créer un compte" : "Se connecter"}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
