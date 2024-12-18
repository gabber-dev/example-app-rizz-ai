# Rizz.AI Example App

Rizz.AI is a gym for your social skills. Practice talking to various personas in different scenarios and get a score at the end.

This app can be completely deployed on its own with no additional infrastrucure. We've written a [technical blog post](https://docs.gabber.dev/sample-app) that can be used as a guide when navigating this repo.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgabber-dev%2Fexample-app-rizz-ai&env=GABBER_API_KEY,GABBER_CREDIT_ID,STRIPE_SECRET_KEY,STRIPE_REDIRECT_HOST,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,GOOGLE_REDIRECT_URI&project-name=rizz-ai-clone)

## Pre-Requisites

Before you can run the app, you'll need a few things.

### Gabber

Create a [Gabber](https://app.gabber.dev) project.

Rizz.AI uses the following Gabber features:
- Credits: Tracking end-user credit balances
- Personas + Scenarios: The characters and situations the end users interact with
- Webhook: Responding to usage events to adjust users' credit balances
- Chat Completions: LLM completions endpoint for scoring the user's Rizz

Before running the app you'll need to create a Credit object in the Gabber dashboard
and a few personas and scenarios to populate the app.

You will also need to set a webhook. For local development, use [ngrok](https://chatgpt.com/share/674aa232-bb14-800e-b0b5-35a5c8c787ca).

After doing so set the following environment variable in .env.local

```
GABBER_API_KEY=<api-key-from-gabber-dashboard>
GABBER_CREDIT_ID=<credit-id-in-gabber-dashboard>
```

### Google OAuth
The app uses Google OAuth for user authentication. You'll need to set up a Google Cloud project to obtain OAuth 2.0 credentials.

1. **Create a Google Cloud Project**:
   - Go to the Google Cloud Console.
   - Create a new project or select an existing one.
2. **Enable OAuth Consent Screen**:
   - Navigate to APIs & Services > OAuth consent screen.
   - Select "external" if you plan to build an app for people outside of your organization.
   - Configure the consent screen by adding the necessary information.
   - Once you've added this info, select "publish app"
3. **Create OAuth Client ID**:
   - Go to APIs & Services > Credentials.
   - Click Create Credentials and select OAuth 2.0 client ID.
   - Choose Web Application as the application type.
   - Under Authorized JavaScript origins, add your app's URL (e.g., http://localhost:3000).
   - Under Authorized redirect URIs, add http://localhost:3000/auth/google/callback.
   - Click Create to obtain your Client ID and Client Secret.
4. **Set Environment Variables**:

   Add the following to your .env.local file:

   ```bash
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
   ```

### Stripe

This project is configured to use Stripe for payments and checkout. It supports subscriptions as well as one-time purchases of Rizz credits.

1. **Create a Stripe Account**:
   - Sign up at Stripe Dashboard.
2. **Obtain API Keys**:
   - Navigate to Developers > API keys.
   - Copy the Publishable key and Secret key.
3. **Set Up Products and Pricing**:
   - Go to Products in the Stripe Dashboard.
   - Create products and pricing plans as needed.
   - IMPORTANT: For each product, set metadata `credit_amount=<integer>`. The app uses the metadata to determine how many Rizz credits to grant for each purchase or subscription.
4. **Set Environment Variables**:
   
   Add the following to your .env.local file:
   
   ```bash
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   STRIPE_REDIRECT_HOST=http://localhost:3000
   ```
## Getting Started
Follow these steps to run the app locally:

1. **Clone the Repository and install dependencies**:

   ```bash
   git clone https://github.com/yourusername/rizzai-example-app.git
   cd rizzai-example-app
   pnpm install
   ```

2. **Set Up Environment Variables**:

   Create a file named `.env.local` in the root directory.
   Add all the environment variables as mentioned above.

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

4. **Access the App**:

   Open your browser and navigate to http://localhost:3000.
