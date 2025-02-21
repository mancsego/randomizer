import { EntityType } from '@/Types'
import { add, load, remove, update } from '@/util/DataSource'

const loadEntities = async () => load()

const addEntity = async (e: EntityType) => add(e)

const removeEntity = async (id: string) => {
  await remove(id)
}

const updateEntity = async (id: string, e: EntityType) => {
  await update(id, e)
}

export { addEntity, loadEntities, removeEntity, updateEntity }
