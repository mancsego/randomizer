import { initializeApp } from 'firebase/app'
import { get, getDatabase, push, ref, set } from 'firebase/database'

const LOCAL_KEY = 'db'
const USERS = 'users'

const _loadLocal = () => JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}')

const _getDb = (() => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    databaseURL: import.meta.env.VITE_DATABASE_URL
  }

  const app = import.meta.env.VITE_DATABASE_URL ? initializeApp(firebaseConfig) : null
  let db

  return () => {
    if (db) return db
    db = { source: app ? getDatabase(app) : null }

    return db
  }
})()

const load = async () => {
  const { source } = _getDb()

  if (!source) return _loadLocal()

  const dbRef = ref(source, USERS)
  const snapshot = await get(dbRef)

  return snapshot.val() ?? {}
}
const add = async (e) => {
  const { source } = _getDb()

  if (source) {
    const { key } = push(ref(source, USERS))
    await set(ref(source, `${USERS}/${key}`), e)
    return key
  }

  const key = Date.now()
  localStorage.setItem(LOCAL_KEY, JSON.stringify({ ..._loadLocal(), [key]: e }))

  return key
}

const remove = async (id) => {
  const { source } = _getDb()

  if (source) {
    await set(ref(source, `${USERS}/${id}`), null)
    return
  }

  const db = _loadLocal()
  const { [id]: _, updated } = db
  console.log(source, _, updated)

  localStorage.setItem(LOCAL_KEY, JSON.stringify(updated ?? {}))
}

const update = async (id, e) => {
  const { source } = _getDb()

  if (source) {
    await set(ref(source, `${USERS}/${id}`), e)
    return
  }

  const db = _loadLocal()
  localStorage.setItem(LOCAL_KEY, JSON.stringify({ ...db, [id]: e }))
}

export { add, load, remove, update }
