# Zerologon website

The website for the Zerologon student cybersecurity cell, built with Next.js and Sanity. Needs Node 22.12 or newer.

## Run it locally

```bash
npm install
npm run dev
```

The site is at http://localhost:3000. Without a Sanity project ID it uses the files in `data/`.

## Update the content

Editors don't need any of this code. Sign in at [zerologon.sanity.studio](https://zerologon.sanity.studio), change something, and press Publish. It's live within a few seconds.

| To change | Go to |
| --- | --- |
| Add an event | Events |
| Move an event to past events | Nothing: it moves by itself once its date has passed |
| Update members | Core team (drag to reorder) |
| Add photos | Gallery (drop several at once) |
| Change homepage text, email or social links | Site settings |

Links and sections with nothing filled in stay hidden, so the site never shows a dead link.

## Connect Sanity for the first time

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) with a public dataset named `production`. Use a shared club email, not a personal one.
2. Copy `.env.example` to `.env.local` and `studio/.env.example` to `studio/.env`, then fill them in. Set `SANITY_REVALIDATE_SECRET` to a long random string, and create an Editor token in Manage for `SANITY_WRITE_TOKEN`.
3. Check, then import the current content:

   ```bash
   node --env-file=.env.local scripts/import-to-sanity.mjs --dry-run
   ```

   ```bash
   node --env-file=.env.local scripts/import-to-sanity.mjs
   ```

4. Deploy the editor. You'll choose its address, such as `zerologon.sanity.studio`:

   ```bash
   cd studio && npm install && npx sanity deploy
   ```

5. In Vercel, add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` and `SANITY_REVALIDATE_SECRET`, then redeploy. Don't add the write token.
6. In Manage, under API, add a webhook:
   - URL: `https://zerologon.vercel.app/api/revalidate`
   - Dataset: `production`
   - Trigger on: create, update and delete
   - Method: POST
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`
7. Delete the write token in Manage.

If you change the schema files in `studio/schemaTypes`, run `npx sanity deploy` from `studio/` again.

## How it fits together

- `lib/content/` is the only code that knows where content comes from. `local.ts` reads `data/`, `sanity.ts` reads Sanity, and setting `NEXT_PUBLIC_SANITY_PROJECT_ID` switches between them.
- `studio/` is the editor. It's a separate project with its own dependencies, so it stays out of the public site.
- `app/api/revalidate` receives Sanity's signed webhook on each publish and rebuilds the page. The old page keeps being served until the new one is ready, so a Sanity outage can't take the site down. Pages also refresh hourly, which moves past events and covers any missed webhook.

## Troubleshooting

If the site shows `unable to verify the first certificate`, antivirus software is scanning HTTPS traffic. Avast does this. Run Next with `node --use-system-ca` so Node trusts the Windows certificate store. It only affects your own computer, not Vercel.

## Yearly handover

- [ ] Transfer ownership of the Sanity project and the Vercel project to the new web lead
- [ ] Invite new editors at sanity.io/manage and remove people who have left
- [ ] Rotate `SANITY_REVALIDATE_SECRET` in both Vercel and the Sanity webhook
- [ ] Update the core team in the Studio
- [ ] Check the Sanity free plan limits are still fine at sanity.io/manage
- [ ] Run `npm audit` and upgrade `next`. This is a security club's site, so keep it clean
