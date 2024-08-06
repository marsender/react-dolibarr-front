import React, { useEffect } from 'react'
import { useErrorBoundary } from './ErrorBoundaryContext'

const ErrorLogger = () => {
	const { error } = useErrorBoundary()

	useEffect(() => {
		if (error) {
			// Log error to an external service
			console.error('Logging error:', error)
		}
	}, [error])

	return null
}

export default ErrorLogger
