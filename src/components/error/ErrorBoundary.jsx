import React from 'react'
import { useErrorBoundary } from './ErrorBoundaryContext'

const ErrorBoundary = ({ children, fallback }) => {
	const { hasError, error } = useErrorBoundary()

	if (hasError) {
		return fallback ? fallback : <h1>Something went wrong.</h1>
	}

	return children
}

export default ErrorBoundary
