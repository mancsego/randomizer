import { useEntityStore } from '@/store/entities'
import { Switch } from '@headlessui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function Enabler({ id, value }) {
  const update = useEntityStore((state) => state.update)
  const [enabled, setEnabled] = useState(value)

  const handler = async (v) => {
    await update(id, v)
    setEnabled(v)
  }

  return (
    <Switch
      checked={enabled}
      onChange={handler}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full border border-slate-700 bg-slate-100 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-slate-600">
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white border border-slate-700 ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
      />
    </Switch>
  )
}

Enabler.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired
}
