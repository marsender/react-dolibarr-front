import PropTypes from 'prop-types'

const Loading = ({ children = 'Loading' }) => (
	<>
		<h1 className="flex text-center my-4 text-2xl font-semibold">{children}</h1>
	</>
)

Loading.propTypes = {
	children: PropTypes.string,
}

export default Loading
