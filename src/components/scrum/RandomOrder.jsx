import { useEntityStore } from '@/store/entities'
import { Button } from '@headlessui/react'
import { lazy, Suspense, useState } from 'react'
const EntityContainer = lazy(() => import('@/components/EntityContainer'))

export default function RandomOrder() {
  const getEnabled = useEntityStore((state) => state.getEnabled)
  const [ordered, setOrdered] = useState([])

  const toOrdered = () => {
    const data = Object.values(getEnabled())
      .filter(({ enabled }) => enabled)
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

    setOrdered(data)
  }

  return (
    <div>
      <Button className="btn btn-primary" onClick={toOrdered}>
        Random order!
      </Button>
      <Suspense>{ordered.length ? <EntityContainer entities={ordered} /> : null}</Suspense>
    </div>
  )
}
