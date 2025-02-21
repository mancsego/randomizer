import Entity from '@/components/Entity'
import { EntityType } from '@/Types'

export default function EntityContainer({ entities }: { entities: EntityType[] }) {
  return (
    <ol>
      {entities.map(({ name }, i) => (
        <Entity key={i} name={name} />
      ))}
    </ol>
  )
}
