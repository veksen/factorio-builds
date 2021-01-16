/* eslint-disable no-undef */
module.exports = {
  serverRuntimeConfig: {
    clientId: process.env.CLIENT_ID || "frontend",
    clientSecret: process.env.CLIENT_SECRET || "511536EF-F270-4058-80CA-1C89C192F69A",
    cookieSecret: process.env.COOKIE_SECRET || "B762654A-98E7-4C3A-9DBF-1E52D56D6F1B",
  },
  publicRuntimeConfig: {
    webUrl: process.env.WEB_URL || "http://localhost:3000",
    apiUrl: process.env.API_URL || "https://api.local.factorio.tech",
    identityUrl: process.env.IDENTITY_URL || "https://identity.local.factorio.tech",
    cloudRoleName: process.env.CLOUD_ROLE_NAME || "Web",
    cloudRoleInstance: process.env.CLOUD_ROLE_INSTANCE || "local-yarn",
    enableApplicationInsights: process.env.ENABLE_APPLICATION_INSIGHTS || "true",
    instrumentationKey: process.env.INSTRUMENTATION_KEY || "c0c671bc-a52a-4c43-bae7-41e571f56b3a",
  },
  images: {
    domains: [
      new URL(process.env.API_URL || "https://api.local.factorio.tech").hostname,
    ],
  },
}
