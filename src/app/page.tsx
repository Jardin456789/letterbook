"use client"

import dynamic from "next/dynamic"

import { AuthModalTrigger } from "@/components/auth"

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground">
      <div className="absolute right-6 top-6 z-20">
        <AuthModalTrigger />
      </div>
      <div className="absolute inset-0">
        <LiquidEther
          className="h-full w-full"
          colors={["#3155FF", "#D6E4FF", "#FFC94D", "#2238A5"]}
          autoDemo
          autoSpeed={0.45}
          autoIntensity={2}
          resolution={0.65}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-background via-background/40 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center">
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          Letterbook
        </span>

        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          Le réseau social des lecteurs passionnés.
        </h1>

        <p className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
          Tenez votre journal de lecture, partagez des avis, créez des listes et suivez vos amis
          pour découvrir leurs dernières lectures.
          <span className="block sm:inline">
            Lettrebook rassemble votre communauté de lecteurs en un seul lieu.
          </span>
        </p>
      </div>
    </main>
  )
}
