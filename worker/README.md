# TalentisOS-X GitHub sync Worker

This Worker is the secure backend for the GitHub OAuth option. It keeps the GitHub OAuth token in an encrypted, `HttpOnly` session cookie and stores each signed-in user’s workspace at `users/<github-user-id>.json` in the private repository configured by `GITHUB_DATA_REPO`.

## One-time setup

1. Create a **private** GitHub repository named `TalentisOS-X-data` (or change `GITHUB_DATA_REPO` in `wrangler.jsonc`).
2. Create a GitHub OAuth App. Set its callback URL to:
   `https://<your-worker-subdomain>.workers.dev/auth/callback`
3. From this directory, install Wrangler if needed and authenticate:

```sh
npx wrangler login
```

4. Add the secrets. Do not commit them:

```sh
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler secret put SESSION_SECRET
```

5. Deploy:

```sh
npx wrangler deploy
```

6. Open TalentisOS-X Settings, enter the Worker URL, save it, then choose **Connect GitHub**.

The frontend keeps IndexedDB as its offline fallback. When the Worker URL is configured, app saves are also sent to the authenticated GitHub data endpoint.
