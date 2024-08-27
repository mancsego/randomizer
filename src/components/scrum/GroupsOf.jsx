import { useEntityStore } from '@/store/entities'
import { Button, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { lazy, Suspense, useEffect, useState } from 'react'
const EntityContainer = lazy(() => import('@/components/EntityContainer'))

export default function GroupsOf() {
  const [options, setOptions] = useState([1])
  const [clusterLength, setClusterLength] = useState(options[0])
  const [cluster, setCluster] = useState([])
  const getEnabled = useEntityStore((state) => state.getEnabled)
  const entities = useEntityStore((state) => state.entities)

  const getRanges = () => {
    const data = Object.values(getEnabled())
      .filter(({ enabled }) => enabled)
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

    const length = data.length

    let clusters = []
    for (let i = 0; i < length; i += clusterLength) {
      clusters = [...clusters, data.slice(i, i + clusterLength)]
    }

    setCluster(clusters)
  }

  useEffect(() => {
    const length = getEnabled().length + 1
    setOptions([...Array(length).keys()].slice(1))
  }, [entities])

  return (
    <div>
      <div className="flex">
        <Button className="btn btn-primary" onClick={getRanges}>
          Give me
        </Button>
        <div>
          <Listbox value={clusterLength} onChange={setClusterLength}>
            <ListboxButton
              className={clsx(
                'relative block w-full border border-slate-500 bg-slate-50 py-1.5 pr-8 pl-3 text-left text-sm/6 text-slate-500',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-slate-500/25'
              )}>
              groups of {clusterLength}
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              transition
              className={clsx(
                'w-[var(--button-width)] border border-slate-500 bg-slate-50 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
              )}>
              {options.map((o) => (
                <ListboxOption
                  key={o}
                  value={o}
                  className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-slate-500/10">
                  <div className="text-sm/6 text-slate-500">groups of {o}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>
      <Suspense>
        {cluster.map((c, i) => (
          <EntityContainer key={i} entities={c} />
        ))}
      </Suspense>
    </div>
  )
}
