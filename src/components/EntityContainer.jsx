import Entity from '@/components/Entity'
import PropTypes from 'prop-types'

export default function EntityContainer({ entities }) {
  return (
    <ol>
      {entities.map(({ name }, i) => (
        <Entity key={i} name={name} />
      ))}
    </ol>
  )
}

EntityContainer.propTypes = {
  entities: PropTypes.array.isRequired
}
