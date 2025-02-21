import close from '@/assets/close.svg'
import { useEntityStore } from '@/store/entities'

export default function Remove({ id }: { id: string }) {
  const handle = useEntityStore((state) => state.remove)

  return (
    <span className="p-1" onClick={() => handle(id)}>
      <img src={close} alt={id} className="inline h-6 m-0 cursor-pointer hover:scale-110" />
    </span>
  )
}
