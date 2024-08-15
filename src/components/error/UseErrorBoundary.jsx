import { useContext } from 'react'
import { ErrorBoundaryContext } from './ErrorBoundaryContext'

export const UseErrorBoundary = () => {
	return useContext(ErrorBoundaryContext)
}
