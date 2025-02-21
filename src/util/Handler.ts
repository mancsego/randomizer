import { Entity } from '@/Types'
import { add, load, remove, update } from '@/util/DataSource'

const loadEntities = async () => load()

const addEntity = async (e: Entity) => add(e)

const removeEntity = async (id: string) => {
  await remove(id)
}

const updateEntity = async (id: string, e: Entity) => {
  await update(id, e)
}

export { addEntity, loadEntities, removeEntity, updateEntity }
