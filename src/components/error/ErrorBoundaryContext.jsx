import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const ErrorBoundaryContext = createContext()

export const ErrorBoundaryProvider = ({ children }) => {
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
