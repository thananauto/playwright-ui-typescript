import { InfluxDB, Point } from '@influxdata/influxdb-client'

class InfluxDb {
  readonly writeApi

  constructor() {
    this.writeApi = new InfluxDB({
      url: process.env.INFLUX_URL as string,
      token: process.env.INFLUX_TOKEN as string,
    }).getWriteApi(process.env.INFLUX_ORG as string, process.env.INFLUX_BUCKET as string)
  }

  async writeMeasurement(point: Point) {
    this.writeApi.writePoint(point)
  }

  async closeApi() {
    await this.writeApi.close().then(() => {
      console.log('WRITE FINISHED')
    })
  }
}

const influx = new InfluxDb()
export { influx, Point }
