import { AuthClientConfig } from "@asgardeo/auth-react";

const authConfig: AuthClientConfig<any> = {
    signInRedirectURL: window.location.origin,
    signOutRedirectURL: window.location.origin,
    clientID: import.meta.env.VITE_ASGARDEO_CLIENT_ID || "BQzm8sLkDE3AEsitlFeXzmqVfhMa",
    baseUrl: import.meta.env.VITE_ASGARDEO_BASE_URL || "https://api.asgardeo.io/t/chintanawilamuna",
    scope: ["openid", "profile", "email"],
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5001",
};

export default authConfig;
