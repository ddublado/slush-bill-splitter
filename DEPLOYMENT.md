# Deployment Status

## Frontend (Vercel)

The frontend has been successfully deployed to Vercel. You can access it at:

https://slush-bill-splitter-n33tp529o-dominic-joaquin-dublados-projects.vercel.app

## Backend (Railway)

The backend has been successfully deployed to Railway. You can access it at:

https://split-bill-interface-production.up.railway.app

## Environment Variables

The frontend has been configured with the following environment variable:

- `NEXT_PUBLIC_API_URL`: https://split-bill-interface-production.up.railway.app

## Testing the Deployment

1. Open the frontend URL in a browser: https://slush-bill-splitter-n33tp529o-dominic-joaquin-dublados-projects.vercel.app
2. Try to create a bill split with multiple participants.
3. Validate the split to ensure the backend API is working correctly.

## Redeployment Instructions

### Frontend (Vercel)

To redeploy the frontend after making changes:

1. Push your changes to GitHub:
   ```
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. Vercel will automatically redeploy the frontend.

3. Alternatively, you can manually redeploy using the Vercel CLI:
   ```
   cd frontend
   vercel --prod
   ```

### Backend (Railway)

To redeploy the backend after making changes:

1. Push your changes to GitHub:
   ```
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. Redeploy using the Railway CLI:
   ```
   cd backend
   npx @railway/cli up
   ```

## Troubleshooting

- If the frontend can't connect to the backend, check that the `NEXT_PUBLIC_API_URL` environment variable is set correctly.
- Ensure that CORS is properly configured in the backend to allow requests from your Vercel domain.
- Check the Railway logs if the backend is not responding as expected. 