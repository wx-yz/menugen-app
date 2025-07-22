/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASGARDEO_CLIENT_ID: string
  readonly VITE_ASGARDEO_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
