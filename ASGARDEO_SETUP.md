# Setting up Asgardeo for MenuGen

This guide will help you set up Asgardeo authentication for the MenuGen application.

## Prerequisites

1. An Asgardeo organization account
2. Access to create applications in Asgardeo console

## Step 1: Create an Organization

If you don't have an Asgardeo organization yet:

1. Go to [Asgardeo Console](https://console.asgardeo.io/)
2. Sign up for a new organization or sign in to an existing one
3. Note your organization name (will be referred to as `<org_name>`)

## Step 2: Create a Single Page Application

1. Navigate to **Applications** in the Asgardeo Console
2. Click **New Application**
3. Select **Single Page Application**
4. Configure the application:
   - **Name**: `MenuGen`
   - **Description**: `AI-powered menu visualization app`
   - **Callback URLs**: `http://localhost:3000`
   - **Allowed Origins**: `http://localhost:3000`
   - **Access URL**: `http://localhost:3000`

5. Click **Register**

## Step 3: Configure the Application

After creating the application:

1. Go to the **Info** tab and copy the **Client ID**
2. Go to the **Access** tab and:
   - Add `http://localhost:3000` to **Allowed Origins**
   - Check **Public client** option
   - Set **PKCE** to **Mandatory**
3. Click **Update**

## Step 4: Update Environment Variables

Update your frontend `.env` file with the Asgardeo configuration:

```bash
# Frontend .env file
VITE_API_URL=http://localhost:5000
VITE_ASGARDEO_CLIENT_ID=your_client_id_here
VITE_ASGARDEO_BASE_URL=https://api.asgardeo.io/t/your_org_name
VITE_ASGARDEO_REDIRECT_URL=http://localhost:3000
```

Replace:
- `your_client_id_here` with the Client ID from Step 3
- `your_org_name` with your organization name from Step 1

## Step 5: Test Authentication

1. Start the development servers:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:3000` in your browser

3. Click **Sign In** - you should be redirected to Asgardeo's login page

4. After successful authentication, you should be redirected back to the app

## Optional: Enable Social Login

To enable social login providers (Google, Facebook, etc.):

1. In Asgardeo Console, go to **Identity Providers**
2. Add your preferred social login providers
3. Configure the providers with your app credentials
4. Enable them for your MenuGen application

## Troubleshooting

### Common Issues:

1. **CORS errors**: Ensure `http://localhost:3000` is added to Allowed Origins
2. **Redirect errors**: Verify callback URLs match exactly (including port)
3. **Client ID errors**: Double-check the Client ID in your .env file

### Mock Authentication

If you're having issues with Asgardeo setup, the app includes a mock authentication system that works without Asgardeo configuration. Just click "Sign In" and it will simulate authentication.

## Production Setup

For production deployment:

1. Update callback URLs to your production domain
2. Update environment variables with production URLs
3. Ensure HTTPS is enabled for production domains
4. Configure proper CORS settings for your production API

## Support

For Asgardeo-specific issues, check:
- [Asgardeo Documentation](https://wso2.com/asgardeo/docs/)
- [Asgardeo Community](https://discord.gg/wso2)
- [GitHub Issues](https://github.com/asgardeo/asgardeo-auth-spa-sdk/issues)
