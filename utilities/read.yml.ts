import * as fs from 'fs'
import * as yaml from 'js-yaml'

interface ReadType {
  overideFileName(fileName: string): void
  getFile(): string
  sizeOfFile(fileName: string): number
}
class _ReadYaml implements ReadType {
  private fileName
  sizeOfFile(fileName: string) {
    return fileName.length
  }
  constructor(filename: string, _size: number) {
    this.fileName = filename
  }

  overideFileName(fileName = 'check') {
    this.fileName = fileName
  }

  getFile(): string {
    const content = fs.readFileSync(`test_data/${this.fileName}`, {
      encoding: 'utf-8',
    })
    const y = yaml.load(content)
    return y as string
  }
}
