import { MongoClient, ServerApiVersion } from 'mongodb'
import { EJSON, type ObjectId } from 'bson'
import dotenv from 'dotenv'
dotenv.config()

interface Student {
  _id?: ObjectId
  first_name: string
  last_name: string
  major: string
  age: number
}

class MongoClientSingelton {
  private client: MongoClient
  public static instance: MongoClientSingelton

  constructor() {
    if (MongoClientSingelton.instance) {
      throw new Error('You can only create one instance!')
    }
    console.log(`constructor called! `)
    this.client = new MongoClient(process.env.DB_CONN_STRING as string, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    console.log('successfully created')
    MongoClientSingelton.instance = this
  }
  async initClient() {
    this.client.connect()
  }

  async getClient() {
    return this.client
  }

  async closeConnection() {
    if (this.client) {
      console.log('successfully closed')
      await this.client.close()
    }
  }

  async readStudent(studentname: string) {
    const result = await this.client
      .db(process.env.DB_NAME as string)
      .collection(process.env.COLLECTION_NAME as string)
      .findOne<Student>({ first_name: studentname })
    if (result) {
      const student = EJSON.stringify(result)
      const stu: Student = JSON.parse(student)
      delete stu._id
      return stu
    } else {
      throw Error(`No result returned for Student ${studentname}`)
    }
  }
}

const dbSingleton = Object.freeze(new MongoClientSingelton())
export { dbSingleton, MongoClientSingelton }
