import { useEntityStore } from '@/store/entities'
import { Button } from '@headlessui/react'
import { lazy, Suspense, useState } from 'react'
const Entity = lazy(() => import('@/components/Entity'))

export default function PickOne() {
  const getEnabled = useEntityStore((state) => state.getEnabled)
  const [random, setRandom] = useState(null)

  const pick = () => {
    const entities = getEnabled()
    setRandom(entities[Math.floor(Math.random() * entities.length)])
  }

  return (
    <div>
      <Button className="btn btn-primary" onClick={pick}>
        Pick one!
      </Button>
      <ul>
        <Suspense>{random ? <Entity name={random.name} /> : null}</Suspense>
      </ul>
    </div>
  )
}
