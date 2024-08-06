import React, { createContext, useContext, useState } from 'react'

const ErrorBoundaryContext = createContext()

export const useErrorBoundary = () => {
	return useContext(ErrorBoundaryContext)
}

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
