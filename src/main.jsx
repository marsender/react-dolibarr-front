import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import store from './redux/store'
import App from './App.jsx'
import i18n from './i18n'
import { ErrorBoundaryProvider } from './components/error/ErrorBoundaryContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<I18nextProvider i18n={i18n}>
			<ErrorBoundaryProvider>
				<App />
			</ErrorBoundaryProvider>
		</I18nextProvider>
	</Provider>
)
