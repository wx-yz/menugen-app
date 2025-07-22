import { AuthClientConfig } from "@asgardeo/auth-react";

const authConfig: AuthClientConfig<any> = {
    signInRedirectURL: window.location.origin,
    signOutRedirectURL: window.location.origin,
    clientID: import.meta.env.VITE_ASGARDEO_CLIENT_ID || "your_client_id",
    baseUrl: import.meta.env.VITE_ASGARDEO_BASE_URL || "https://api.asgardeo.io/t/your_org",
    scope: ["openid", "profile", "email"]
};

export default authConfig;
