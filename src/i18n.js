import i18n from 'i18next'
import { fr, en } from './locales'

i18n.init({
	lng: 'fr',
	debug: false,
	returnEmptyString: false,
	fallbackLng: 'fr',
	defaultNS: 'translation',
})

i18n.addResourceBundle('fr', 'translation', fr)
i18n.addResourceBundle('en', 'translation', en)

export default i18n
