import Enabler from '@/components/Enabler'
import Remove from '@/components/Remove'
import { useEntityStore } from '../store/entities'

export default function EntityList() {
  const entities = useEntityStore((state) => state.entities)

  return (
    <div className="card flex flex-col items-center">
      <h1>Team members:</h1>
      <div className="flex flex-wrap gap-1 min-h-24">
        {Object.entries(entities).map(([id, { name, enabled }]) => (
          <span className="pill" key={id}>
            <span className="mr-2">{name}</span>
            <Enabler id={id} value={enabled} />
            <Remove id={id} />
          </span>
        ))}
      </div>
    </div>
  )
}
