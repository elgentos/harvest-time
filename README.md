# Harvest Time Proxy

Allow browser extensions to access a part of the Harvest API safely.

## Purpose

Do a safe query to the time entries API and allow to parse the result in your favorite tool.
For instance, Gitlab.

## Allowed Harvest endpoint

`/api/v2/time_entries?external_reference_id=[YOUR_REFERENCE]`

Docs: https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries/

## Technology Stack

This project is built with:
- **Next.js 14** (App Router)
- **Node.js 18+**
- Deployed on **Vercel**

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Copy the environment variables template:
```bash
cp .env.example .env
```

3. Configure your environment variables in `.env`:
```
HARVEST_TOKEN=your_harvest_token_here
HARVEST_ACCOUNT_ID=your_harvest_account_id_here
HARVEST_API=https://api.harvestapp.com/
ELGENTOS_AUTHORIZATION=Bearer your_secret_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set up environment variables in the Vercel dashboard or via CLI:
```bash
vercel env add HARVEST_TOKEN
vercel env add HARVEST_ACCOUNT_ID
vercel env add ELGENTOS_AUTHORIZATION
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Configure environment variables:
   - `HARVEST_TOKEN`
   - `HARVEST_ACCOUNT_ID`
   - `HARVEST_API` (optional, defaults to https://api.harvestapp.com/)
   - `ELGENTOS_AUTHORIZATION` (optional, secure your endpoint)
6. Click "Deploy"

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/elgentos/harvesttimeproxy)

## Harvest Access

Get your token from your Harvest account: https://id.getharvest.com/developers

## Environment Variables

- `HARVEST_TOKEN` - Your Harvest API token (required)
- `HARVEST_ACCOUNT_ID` - Your Harvest account ID (required)
- `HARVEST_API` - Harvest API base URL (optional, defaults to https://api.harvestapp.com/)
- `ELGENTOS_AUTHORIZATION` - Authorization header value to secure your endpoint (optional)

## API Usage

Once deployed, you can access the proxy at:

```
https://your-deployment.vercel.app/api/v2/time_entries?external_reference_id=YOUR_REFERENCE
```

If you've set `ELGENTOS_AUTHORIZATION`, include it in your request headers:

```bash
curl -H "Authorization: Bearer your_secret_token_here" \
  "https://your-deployment.vercel.app/api/v2/time_entries?external_reference_id=YOUR_REFERENCE"
```

## Migration from Heroku

This project has been migrated from a Node.js HTTP server to Next.js App Router for better compatibility with Vercel. The API endpoint path remains the same, so existing integrations should continue to work without changes.

## Special shoutout

Special shoutout to [@woutersteen](https://github.com/woutersteen) because I removed the original script from Heroku and needed to recreate this awesomeness again. Cheers Wouter! 

Thanks Jeroen. But it's time to move on. We migrated this script from Heroku to Vercel. :)

