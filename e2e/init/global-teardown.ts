import { dbSingleton } from '@utilities/mongoclient'

async function teardown() {
  console.log('clean up ')
  await dbSingleton.closeConnection()
}

export default teardown
