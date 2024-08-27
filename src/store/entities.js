import { addEntity, loadEntities, removeEntity, updateEntity } from '@/util/Handler'
import { create } from 'zustand'

//entities
const useEntityStore = create((set, get) => ({
  entities: {},
  getEnabled: () => {
    const { entities } = get()
    return Object.values(entities).filter(({ enabled }) => enabled)
  },
  fetch: async () => {
    const entities = await loadEntities()

    set({ entities })
  },
  add: async (name) => {
    const newEntity = { name, enabled: true }
    const { entities } = get()

    try {
      const id = await addEntity(newEntity)
      set({ entities: { ...entities, [id]: newEntity } })
    } catch (e) {
      console.error(e)
    }
  },
  remove: async (id) => {
    const { entities } = get()

    try {
      await removeEntity(id)
      const { [id]: _, ...updated } = entities
      set({ entities: updated })
    } catch (e) {
      console.error(e)
    }
  },
  update: async (id, enabled) => {
    const { entities } = get()

    const updated = { ...entities[id], enabled }
    try {
      await updateEntity(id, updated)
      set({ entities: { ...entities, [id]: updated } })
    } catch (e) {
      console.error(e)
    }
  }
}))

export { useEntityStore }
