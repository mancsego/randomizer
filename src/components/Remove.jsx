import close from '@/assets/close.svg'
import { useEntityStore } from '@/store/entities'
import PropTypes from 'prop-types'

export default function Remove({ id }) {
  const handle = useEntityStore((state) => state.remove)

  return (
    <span className="p-1" onClick={() => handle(id)}>
      <img src={close} alt={name} className="inline h-6 m-0 cursor-pointer hover:scale-110" />
    </span>
  )
}

Remove.propTypes = {
  id: PropTypes.string.isRequired
}
