# Discord Webhook
This GitHub Action can produce fancy and **more meaningful Discord messages for your commits**.

## Setup
Setup this code on your repository's `.github/workflows/` in a file like `discord-push.yml` and push the changes:

```yml
name: Discord Webhook
on: [push]
jobs:
  Discord_notification:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@v3
    - name: Run Discord Webhook
      uses: Mist3r-Robot/classic-discord-webhook@main
      with:
        id: ${{ secrets.DISCORD_WEBHOOK_ID }}
        token: ${{ secrets.DISCORD_WEBHOOK_TOKEN }}
        threadId: ${{ secrets.DISCORD_WEBHOOK_THREAD_ID }}
```

You can see the example file at [/.github/workflows/discord-push.yml](/.github/workflows/discord-push.yml)
## Inputs

in your **Settings > Security > Secrets and variables > Actions > Secrets** (/settings/secrets/actions) on GitHub, you need to add 2 secrets :
- `DISCORD_WEBHOOK_ID`
- `DISCORD_WEBHOOK_TOKEN`


|                                                  `DISCORD_WEBHOOK_ID`                                                  |                           `DISCORD_WEBHOOK_TOKEN`                           |                                   `DISCORD_WEBHOOK_THREAD_ID`                                   |
|:----------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------:|
| **Required** — This is the id of your Discord webhook, if you copy the webhook url, this will be the first part of it. | **Required** — Your Discord webhook token, it's the second part of the url. | Not required — if you want to send the message in a thread, you can specify the thread id here. |
