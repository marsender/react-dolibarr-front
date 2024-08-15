import { useEffect } from 'react'
import { UseErrorBoundary } from './UseErrorBoundary'

const ErrorLogger = () => {
	const { error } = UseErrorBoundary()

	useEffect(() => {
		if (error) {
			// Log error to an external service
			console.error('Logging error:', error)
		}
	}, [error])

	return null
}

export default ErrorLogger
