import PropTypes from 'prop-types'

const Loading = ({ message = 'Loading' }) => (
	<>
		<h1 className="flex text-center my-4 text-2xl font-semibold">{message}</h1>
	</>
)

Loading.propTypes = {
	message: PropTypes.string,
}

export default Loading
