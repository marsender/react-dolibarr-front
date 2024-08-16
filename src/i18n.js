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

// useTranslation (hook)
// https://react.i18next.com/latest/usetranslation-hook
// You can get the i18n instance (in order to change the language)
//i18n.changeLanguage('en-US');

export default i18n
