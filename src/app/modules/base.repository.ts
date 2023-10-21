import { Database, DatabaseReference, getDatabase, ref } from 'firebase/database'
import { firebase } from '../lib/firebase'

class BaseRepository {
  protected database: Database
  protected dbRef: DatabaseReference

  constructor() {
    this.database = getDatabase(firebase)
    this.dbRef = ref(this.database)
  }
}

export default BaseRepository