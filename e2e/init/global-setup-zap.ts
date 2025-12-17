import { request } from '@playwright/test'

async function deleteAllAlerts() {
  const apiContext = await request.newContext({
    baseURL: 'http://localhost:8080',
    timeout: 30000,
  })

  const response = await apiContext.get('/JSON/core/action/deleteAllAlerts/')

  if (!response.ok()) {
    console.error(`❌ Failed to delete alerts: ${response.status()} ${response.statusText()}`)
    await apiContext.dispose()
    return
  }

  const result = await response.json()
  console.log(result.Result === 'OK' ? '✅ All previous alerts deleted successfully' : '⚠️  Unexpected response:', result)

  await apiContext.dispose()
}

async function globalSetup() {
  console.log('\n🚀 Running global setup - Preparing ZAP proxy...\n')
  console.log('🧹 Cleaning up previous ZAP alerts...')

  await deleteAllAlerts().catch(err => console.error('❌ Setup error:', err.message))

  console.log('\n✅ Global setup completed\n')
}

export default globalSetup
