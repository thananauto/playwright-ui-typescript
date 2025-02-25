import type { FullConfig, FullResult, Suite, TestCase, TestResult, Reporter } from '@playwright/test/reporter'
import { influx, Point } from './influxdb'
import { writeFileSync } from 'fs'

class MyReporter implements Reporter {
  count = { total: 0, passed: 0, failed: 0, skipped: 0 }
  arr_err: any = []
  async onBegin(config: FullConfig, suite: Suite) {
    console.log('My Reporter ------ set up DB client instance ......')
    //await setup();
    console.log(`Starting the run with ${suite.allTests().length} tests`)
    this.count['total'] = suite.allTests().length
  }

  async onTestBegin(test: TestCase) {
    console.log(`Starting test ${test.title}`)
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Finished test ${test.title}: ${result.status}`)
    await this.collectStatus(result)
  }

  async onEnd(result: FullResult) {
    //await teardown();
    console.log('My Reporter ------ client instance done ......')
    console.log(`Finished the run: ${result.status}`)
    //overall summary status
    const resultMarkdownMessage = `
        Test run results
        
        Summary:
          - ⌛ Total test cases ${this.count['total']}
          - 📦 Tests results: 
            - Passed ✅: ${this.count['passed']}
            - Failed ❌: ${this.count['failed']}
            - Skipped ⏩: ${this.count['skipped']}
            
        To see the full report, please visit our github page for more details`

    console.log(resultMarkdownMessage)
    writeFileSync('./playwright-report/result.txt', resultMarkdownMessage, {
      flag: 'w',
    })
    //time duration to execute
    console.log(`Total duration: ${result.duration}`)
    if (this.count['failed'] > 0) {
      this.arr_err.map(function (e: any) {
        console.log(e[0]['message'])
      })
    }
    //add the point for influx db
    const status = new Point('QA')
      .tag('Status', 'UI Cases')
      .intField('Total', this.count['total'])
      .intField('Passed', this.count['passed'])
      .intField('Failed', this.count['failed'])
      .intField('Skipped', this.count['skipped'])
    await influx.writeMeasurement(status)

    //add the time duration
    const duration = new Point('QA').tag('Duration', 'time').floatField('Time', result.duration)
    await influx.writeMeasurement(duration)

    await influx.closeApi()
  }

  async collectStatus(status: TestResult) {
    switch (status.status) {
      case 'failed':
      case 'timedOut':
        this.count['failed'] += 1
        this.arr_err.push(status.errors)
        break
      case 'skipped':
        this.count['skipped'] += 1
        break
      case 'passed':
        this.count['passed'] += 1
        break
    }
  }
}

export default MyReporter
