import { request, type APIRequestContext } from '@playwright/test'
import * as fs from 'fs'
import { execSync } from 'child_process'

interface ZAPConfig {
  targetBaseUrl: string
  reportsDir: string
  timestamp: string
}

async function generateHTMLReport(apiContext: APIRequestContext, config: ZAPConfig): Promise<void> {
  const { targetBaseUrl, reportsDir, timestamp } = config
  const url = `/JSON/reports/action/generate/?title=Passive-scan-report&template=traditional-html-plus&sites=${targetBaseUrl}&reportFileName=traditional-html-plus&reportDir=/zap/wrk&display=true`

  const response = await apiContext.get(url)
  if (!response.ok()) {
    console.error(`❌ Failed to generate HTML report: ${response.status()} ${response.statusText()}`)
    return
  }

  console.log('📄 HTML report generated in container, copying folder...')
  const copyCmd = `docker cp zap-proxy:/zap/wrk/traditional-html-plus ${reportsDir}/traditional-html-plus-${timestamp}`
  execSync(copyCmd)
  console.log(`✅ HTML Report Folder: ${reportsDir}/traditional-html-plus-${timestamp}/`)
}

async function generateJSONAlerts(apiContext: APIRequestContext, config: ZAPConfig): Promise<void> {
  const { targetBaseUrl, reportsDir, timestamp } = config

  const response = await apiContext.get(`/JSON/core/view/alerts/`, {
    params: { baseurl: targetBaseUrl },
  })

  if (!response.ok()) {
    console.error(`❌ Failed to generate JSON alerts: ${response.status()} ${response.statusText()}`)
    return
  }

  const contentType = response.headers()['content-type']
  const isJSON = contentType?.includes('application/json')
  const content = isJSON ? JSON.stringify(await response.json(), null, 2) : await response.text()

  fs.writeFileSync(`${reportsDir}/zap-alerts-${timestamp}.json`, content)
  console.log(`✅ JSON Alerts: ${reportsDir}/zap-alerts-${timestamp}.json`)
}

async function printScanSummary(apiContext: APIRequestContext, config: ZAPConfig): Promise<void> {
  const { targetBaseUrl } = config

  const response = await apiContext.get(`/JSON/core/view/numberOfAlerts/`, {
    params: { baseurl: targetBaseUrl },
  })

  if (!response.ok()) {
    console.log('⚠️  Could not fetch scan summary')
    return
  }

  const data = await response.json()
  console.log(`\n📈 ZAP Scan Summary:`)
  console.log(`   Total Alerts for ${targetBaseUrl}: ${data.numberOfAlerts || 0}`)
}

async function globalTeardown() {
  console.log('\n🎬 Running global teardown - Generating ZAP reports...\n')

  const apiContext = await request.newContext({
    baseURL: 'http://localhost:8080',
    timeout: 30000,
  })

  const config: ZAPConfig = {
    targetBaseUrl: 'https://www.saucedemo.com',
    reportsDir: './zap-reports',
    timestamp: new Date().toISOString().replace(/[:.]/g, '-').split('T')[0],
  }

  fs.mkdirSync(config.reportsDir, { recursive: true })

  try {
    console.log('📊 Generating ZAP reports...\n')

    await generateHTMLReport(apiContext, config).catch(err => console.error('❌ HTML report error:', err.message))

    await generateJSONAlerts(apiContext, config).catch(err => console.error('❌ JSON alerts error:', err.message))

    await printScanSummary(apiContext, config).catch(err => console.error('⚠️  Summary error:', err.message))

    console.log(`\n✅ ZAP reports saved to: ${config.reportsDir}\n`)
  } finally {
    await apiContext.dispose()
    console.log('✅ Global teardown completed\n')
  }
}

export default globalTeardown
