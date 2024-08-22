import { initializeApp } from 'firebase/app'
import { get, getDatabase, push, ref, set } from 'firebase/database'

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

  const app = initializeApp(firebaseConfig)
  let db

  return () => {
    if (db) return db
    db = getDatabase(app)

    return db
  }
})()

const _getRef = (() => {
  let cache
  return () => {
    if (cache) return cache

    cache = ref(_getDb(), 'entities')
    return cache
  }
})()

const loadEntities = async () => {
  const dbRef = _getRef()
  const snapshot = await get(dbRef)

  return snapshot.val() ?? {}
}

const addEntity = async (e) => {
  const { key } = push(_getRef())
  await set(ref(getDatabase(), 'entities/' + key), e)
  return key
}

const removeEntity = async (id) => {
  await set(ref(getDatabase(), 'entities/' + id), null)
}

const updateEntity = async (id, e) => {
  await set(ref(getDatabase(), 'entities/' + id), e)
}

export { addEntity, loadEntities, removeEntity, updateEntity }
