import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
//import { rpConfig } from "./rpConfig";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

dotenv.config()
const timestamp = new Date(Date.now()).toUTCString().replace(/ /gi, '_').replace(/:/gi, '').replace(/,/gi, '')
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e' /* Run tests in files in parallel */,
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, //,['.\\custom_report\\customreporter.ts']
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: `./playwright-report/${timestamp}` }],
    ['list'],
    ['./custom_report/customreporter.ts'],
    //['@reportportal/agent-js-playwright', rpConfig],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.saucedemo.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'only-on-failure',
  },
  //globalSetup: require.resolve('./e2e/init/global-setup'),
  //globalTeardown: require.resolve('./e2e/init/global-teardown'),

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Sauce Demo - Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        testIdAttribute: 'data-test',
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
    //  {
    // name: "chromium",
    //  dependencies: ["init DB Connection"],
    //   use: {
    //   ...devices["Desktop Chrome"],
    //    channel: 'chrome',
    //    testIdAttribute: "data-test"
    // launchOptions: {
    //
    //   headless: false
    //   },

    //connectOptions: {
    // wsEndpoint: "ws://playwright-ui-typescript-pw-server-1:3000/"
    //}
    ////   },
    // },
    {
      name: 'init DB Connection',
      testMatch: '**/setup.ts',
      teardown: 'close DB',
    },
    {
      name: 'close DB',
      testMatch: '**/teardown.ts',
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    //{
    //   name: 'Microsoft Edge',
    //   dependencies: ["init DB Connection"],

    //   use: { ...devices['Desktop Edge'], channel: 'msedge', headless: false, testIdAttribute: "data-test" },
    //  },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
