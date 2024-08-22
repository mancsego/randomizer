import PropTypes from 'prop-types'

export default function Entity({ name }) {
  return (
    <li>
      <span className="text-gray-700 text-base">{name}</span>
    </li>
  )
}

Entity.propTypes = {
  name: PropTypes.string.isRequired
}
