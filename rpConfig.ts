import dotenv from 'dotenv'
dotenv.config({ path: '.env.rp' })
export const rpConfig = {
  endpoint: process.env.RP_ENDPOINT,
  apiKey: process.env.RP_API_KEY,
  launch: process.env.RP_LAUNCH || 'Custom regression',
  project: process.env.RP_PROJECT,
  attributes: [
    {
      key: 'agent',
      value: 'playwright',
    },
    {
      value: 'example',
    },
  ],
  description: 'This is an example launch with playwright tests',
  //launchId: process.env.RP_LAUNCH_ID,
  includeTestSteps: true,
  skippedIssue: false,
  restClientConfig: {
    timeout: 0,
  },
}
