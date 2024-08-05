import { Component } from 'react'

/**
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		console.log('Catch error: %o', error)
		console.log('Catch error info: %o', info)
	}

	render() {
		if (this.state.error) {
			return <h1 className="flex text-center my-4 text-2xl font-semibold">Something went wrong.</h1>
		}
		return this.props.children
	}
}

export default ErrorBoundary
