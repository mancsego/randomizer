import { add, load, remove, update } from '@/util/DataSource'

const loadEntities = async () => load()

const addEntity = async (e) => add(e)

const removeEntity = async (id) => {
  await remove(id)
}

const updateEntity = async (id, e) => {
  await update(id, e)
}

export { addEntity, loadEntities, removeEntity, updateEntity }
