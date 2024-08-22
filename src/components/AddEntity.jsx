import { useEntityStore } from '@/store/entities'
import { Button, Field, Input, Label } from '@headlessui/react'
import { useRef, useState } from 'react'

export default function AddEntity() {
  const inputRef = useRef(null)
  const addEntity = useEntityStore((state) => state.add)
  const [name, setName] = useState('')
  const handleSubmit = (key) => {
    if (key !== 'Enter') return

    add()
  }
  const add = () => {
    if (!name) return
    addEntity(name)
    setName('')
    inputRef.current.focus()
  }
  return (
    <div className="card">
      <Field>
        <Label>Name</Label>
        <Input
          ref={inputRef}
          placeholder="John Doe"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          onKeyDown={({ key }) => handleSubmit(key)}
        />
      </Field>
      <Button className="btn btn-primary" onClick={add}>
        Add!
      </Button>
    </div>
  )
}
