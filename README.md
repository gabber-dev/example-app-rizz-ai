# Rizz.AI Example App

Rizz.AI is a gym for your social skills. Practice talking to various personas in different scenarios and get a score at the end.

This app can be completely deployed on its own with no additional infrastrucure.

## Pre-Requisites

Before you can run the app, you'll need a few things.

### Gabber

Create a [https://app.gabber.dev](Gabber) project.

Rizz.AI uses the following Gabber features:
- Credits: Tracking end-user credit balances
- Personas + Scenarios: Creating various voice experiences
- Webhook: Responding to usage events to adjust users' credit balances
- Chat Completions: LLM completions endpoint for scoring the Rizz

Before running the app you'll need to create a Credit object in the Gabber dashboard
and a few personas and scenarios to populate the app.

You will also need to set a webhook. For local development, use [ngrok](https://chatgpt.com/share/674aa232-bb14-800e-b0b5-35a5c8c787ca).

After doing so set the following environment variable in .env.local

```
GABBER_API_KEY=<api-key-from-gabber-dashboard>
GABBER_CREDIT_ID=<credit-id-in-gabber-dashboard>
```

### Google Oauth

### Stripe

This project is configured to use Stripe for payments and checkout. 
It supports subscriptions as well as one-time-purchases of Rizz credits.
