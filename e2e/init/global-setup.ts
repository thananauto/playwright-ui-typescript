import { dbSingleton } from '@utilities/mongoclient'

async function setup() {
  console.log('set up DB client instance ......')
  await dbSingleton.getClient()
}
export default setup
