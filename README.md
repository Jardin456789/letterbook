# Letterbook

Reseau social pour lecteurs : journal, avis, listes et suivi des amis.

## Product Overview

- `Product`: Letterbook unifie la lecture sociale en combinant journal personnel, suivi des amis et recommandations fondees sur vos activites.
- `Vision`: offrir un hub ou les lecteurs consignent leurs lectures, partagent des avis riches et decouvrent ce que lit leur cercle.
- `MVP focus`: auth, profils, recherche de livres, fiche livre, journal, notes, avis, listes, follow, fil d'activite et rapports de moderation simples.

## Domain Model

- **User**: `id`, `username`, `avatar_url`, `bio`, `created_at`
- **Book**: `id`, `title`, `authors`, `cover_url`, `description`, `published_year`, `isbn`, `metadata_json`
- **ReadingEntry**: `id`, `user_id`, `book_id`, `status`, `progress_pages`, `started_at`, `finished_at`, `updated_at`
- **Rating**: `user_id`, `book_id`, `rating_decimal`, `updated_at`
- **Review**: `id`, `user_id`, `book_id`, `title`, `body`, `rating_snapshot`, `created_at`, `updated_at`, `visibility`
- **List**: `id`, `user_id`, `name`, `description`, `is_private`, `created_at`, `updated_at`
- **ListItem**: `list_id`, `book_id`, `position`, `note`
- **Follow**: `follower_id`, `followee_id`, `created_at`
- **Activity**: `id`, `user_id`, `type`, `entity_ids_json`, `created_at`

## Core Flows

- `search_book(title|author) -> open_book -> add_to_journal(status, progress, dates)`
- `rate_book(book_id, rating) -> optional create_review`
- `create_list(name) -> add_books(list_id, [book_ids])`
- `follow_user(target_user_id) -> view_feed()`

## Visibility Rules

- `default`: public
- `list_private`: owner_only
- `review_private`: owner_only

## HTTP API Surface

- `GET /books`: query by title or author
- `POST /reading`: create or update status/progress
- `PUT /ratings`: set rating
- `POST /reviews`: create review
- `POST /lists`: create list
- `POST /lists/:id/items`: add book to list
- `POST /follow/:userId`: follow user
- `GET /feed`: activities from followed users

## Stack

- Next.js 15 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4 preview
- Supabase client helpers (browser + server)
- TanStack Query (React Query) avec fournisseur et DevTools en developpement
- Sonner pour les toasts
- Zod + React Hook Form
- ESLint (Flat config) + Prettier + Husky + lint-staged
- Sentry (client, edge, server) pre-configure

## Getting Started

- Installer les dependances :
  ```bash
  npm install
  ```
- Copier le gabarit d'environnement puis definir vos cles :
  ```bash
  cp .env.example .env.local
  ```
- Lancer le serveur de dev :
  ```bash
  npm run dev
  ```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (optionnel pour les scripts back-office)
- `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_TRACES_SAMPLE_RATE` / `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` (optionnel)

Configurer ces variables dans Vercel (ou votre plateforme) pour chaque environnement. `VERCEL_ENV` est disponible par defaut pour ajuster le comportement entre Preview et Production.

## Supabase Notes

Activer RLS et definir des policies afin que les utilisateurs ne puissent manipuler que leurs propres donnees. Exemple generique :

```sql
alter table public.profiles enable row level security;

create policy "Users can read their own rows"
  on public.profiles for select
  using ( auth.uid() = user_id );

create policy "Users can modify their own rows"
  on public.profiles for insert, update, delete
  with check ( auth.uid() = user_id );
```

## Tooling

- `npm run lint` / `npm run lint:fix`
- `npm run format` / `npm run format:write`
- Husky pre-commit hook lance `lint-staged`

## Monitoring

Sentry est cable via `sentry.*.config.ts`. Renseignez vos DSN pour beneficier du reporting erreurs et performance. Remplacez Sentry par un autre outil si necessaire.

## Project Structure

- `src/app/layout.tsx`: layout racine et providers globaux
- `src/app/globals.css`: styles Tailwind et tokens de theme
- `src/lib/supabase/`: clients Supabase navigateur + serveur
- `src/components/providers/app-providers.tsx`: QueryClient, SupabaseProvider et toasts
- `src/components/auth/`: formulaire et contexte d'authentification Supabase

Construisez vos features sous `src/app`, `src/components` et `src/lib` en suivant ce socle.
