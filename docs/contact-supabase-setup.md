# Contact form → Supabase + email

The contact form on [monsun.io](https://monsun.io) posts to a **Supabase Edge Function**.
The function:

1. Saves the message to table `contact_messages`
2. Emails **contact@monsun.io** via [Resend](https://resend.com)

## 1. Create Supabase project

1. Go to https://supabase.com → New project
2. Open **SQL Editor** → paste and run:

```sql
-- from supabase/migrations/20260806000000_contact_messages.sql
```

Or CLI:

```bash
supabase link --project-ref <YOUR_PROJECT_REF>
supabase db push
```

## 2. Create Resend account (email)

1. Sign up at https://resend.com
2. Add/verify domain **monsun.io** (DNS records in Hostinger)
3. Create an API key
4. Preferred from-address after domain verify: `Monsun Website <noreply@monsun.io>`

Until the domain is verified, Resend allows testing with `onboarding@resend.dev` (only delivers to your Resend account email).

## 3. Deploy Edge Function

```bash
# from repo root monsun.github.io/
supabase functions deploy contact --no-verify-jwt
```

Set function secrets:

```bash
supabase secrets set \
  RESEND_API_KEY=re_xxx \
  CONTACT_FROM_EMAIL="Monsun Website <noreply@monsun.io>"
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are usually available automatically inside Edge Functions. If insert fails, set them explicitly:

```bash
supabase secrets set \
  SUPABASE_URL=https://YOUR_PROJECT.supabase.co \
  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

## 4. Frontend env (local + GitHub Pages / Render)

Create `.env` (local) / CI secrets:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...   # anon/public key only
```

Rebuild and deploy the frontend so Vite embeds these values.

## 5. Test

1. Open https://monsun.io/#contact
2. Submit the form
3. Check Supabase → Table Editor → `contact_messages`
4. Check inbox `contact@monsun.io` (and Resend dashboard logs)

## Security notes

- Never expose the **service role** key in the frontend
- Only `VITE_SUPABASE_URL` + **anon** key go in the Vue app
- Table RLS has no public policies; writes go through the Edge Function only
