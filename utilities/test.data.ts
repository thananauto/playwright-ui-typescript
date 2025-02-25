import * as fs from 'fs'

export class ReadData {
  private file: string
  constructor() {
    this.file = 'data.json'
  }

  setFile(fileName: string) {
    this.file = fileName
  }

  getFile() {
    const loadedConfig = fs.readFileSync(`test_data/${this.file}`, 'utf-8')
    const config = JSON.parse(loadedConfig)
    return config
  }
}

export default class NewFile {}
