import { Button, Field, Input } from '@headlessui/react'
import { useEffect, useState } from 'react'

export default function AwkwardTimer() {
  const [left, setLeft] = useState(10)

  const [timer, setTimer] = useState(null)

  const countdown = () => {
    setLeft((p) => (p <= 1 ? 0 : p - 1))
  }

  const start = () => {
    clearInterval(timer)
    const t = setInterval(countdown, 1000)

    setTimer(t)
  }

  useEffect(() => {
    if (left !== 0) return

    clearInterval(timer)
  }, [left, timer])

  return (
    <div className="flex gap-2">
      <Field className="">
        <Input
          className="max-w-20"
          value={left}
          onChange={({ target: { value } }) => setLeft(value)}
          placeholder="10"
          type="number"
        />
        <div>
          <Button className="btn btn-primary" onClick={start}>
            Go!
          </Button>
        </div>
      </Field>
      <div className="flex flex-col">
        <div className="font-bold uppercase">Awkward timer</div>
        {left ? (
          <div className="grow flex items-end">
            <span className="animate-pulse font-bold mr-1">{left}</span> seconds left
          </div>
        ) : null}
      </div>
    </div>
  )
}
