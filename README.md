# Harvest Time Script
Allow browser extensions to access a part of the Harvest API safely.

## Purpose
Do a safe query to the time entries API and allow to parse the result in your favority tool.
For instance, Gitlab.

## Allowed Harvest endpoint
`time_entries?external_reference=[YOUR_REFERENCE]`

Docs: https://help.getharvest.com/api-v2/timesheets-api/timesheets/time-entries/

## Deploy to heroku
- Create a dyno app
- setup git remote with heroku command line
- push your code
- setup environment variables

## Harvest access
Get your token from your Harvest account. https://id.getharvest.com/developers

## Environment
- `HARVEST_TOKEN`
- `HARVEST_ACCOUNT_ID`
- `ELGENTOS_AUTHORIZATION` (optional, secure your endpoint)

## Special shoutout
Special shoutout to [@woutersteen](https://github.com/woutersteen) because I removed the original script from Heroko and needed to recreate this awesomeness again. Cheers Wouter!

