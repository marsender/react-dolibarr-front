import { UseErrorBoundary } from './UseErrorBoundary'
import PropTypes from 'prop-types'

const ErrorBoundary = ({ children, fallback }) => {
	const { hasError } = UseErrorBoundary()

	if (hasError) {
		return fallback ? fallback : <h1>Something went wrong.</h1>
	}

	return children
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	fallback: PropTypes.func,
}

export default ErrorBoundary
