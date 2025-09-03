import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react-refresh/only-export-components
export const ErrorBoundaryContext = createContext()

const ErrorBoundaryProvider = ({ children }) => {
	const [hasError, setHasError] = useState(false)
	const [error, setError] = useState(null)

	const value = {
		hasError,
		setHasError,
		error,
		setError,
	}

	return <ErrorBoundaryContext.Provider value={value}>{children}</ErrorBoundaryContext.Provider>
}

ErrorBoundaryProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ErrorBoundaryProvider
