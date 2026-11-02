import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  deployment: {
    appId: 'f7tm0l004hou9mib7ahwekwt',
  },
})
