# Deployment Instructions

## Frontend (Vercel)

The frontend has been successfully deployed to Vercel. You can access it at:

https://slush-bill-splitter-2uu8df9g8-dominic-joaquin-dublados-projects.vercel.app

## Backend (Railway)

To deploy the backend to Railway, follow these steps:

1. Sign up for a Railway account at https://railway.app/ if you don't have one already.

2. Install the Railway CLI:
   ```
   npm i -g @railway/cli
   ```

3. Login to Railway:
   ```
   railway login
   ```

4. Navigate to the backend directory:
   ```
   cd backend
   ```

5. Initialize a new Railway project:
   ```
   railway init
   ```

6. Deploy the backend:
   ```
   railway up
   ```

7. Once deployed, get the URL of your backend service:
   ```
   railway domain
   ```

8. Update the frontend environment variable with the backend URL:
   - Go to the Vercel dashboard
   - Navigate to your project settings
   - Go to the "Environment Variables" section
   - Add a new variable: `NEXT_PUBLIC_API_URL` with the value of your Railway backend URL

## Connecting Frontend to Backend

After deploying both the frontend and backend, you need to update the frontend to use the deployed backend API:

1. In the Vercel dashboard, go to your project settings.
2. Navigate to the "Environment Variables" section.
3. Add or update the `NEXT_PUBLIC_API_URL` environment variable with your Railway backend URL.
4. Redeploy the frontend to apply the changes:
   ```
   cd frontend
   vercel --prod
   ```

## Testing the Deployment

1. Open your deployed frontend URL in a browser.
2. Try to create a bill split with multiple participants.
3. Validate the split to ensure the backend API is working correctly.

## Troubleshooting

- If the frontend can't connect to the backend, check that the `NEXT_PUBLIC_API_URL` environment variable is set correctly.
- Ensure that CORS is properly configured in the backend to allow requests from your Vercel domain.
- Check the Railway logs if the backend is not responding as expected. 