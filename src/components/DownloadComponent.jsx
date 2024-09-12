import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import apiDocumentService from '../services/apiDocumentService'

const DownloadComponent = ({ module, documentRef }) => {
	const { t } = useTranslation()

	const downloadFile = async () => {
		let invoiceDocument = await apiDocumentService.getDocuments(module, documentRef).then((response) => {
			if (!Array.isArray(response) && response.length) {
				throw new Error('Incorrect module document: ' + module + ' ' + documentRef)
			}
			return response[0]
		})
		let download = await apiDocumentService.getDocumentDownload(module, invoiceDocument.path).then((response) => {
			if (response === null) {
				throw new Error('Incorrect module document download: ' + module + ' ' + documentRef)
			}
			return response
		})

		// Decode the base64 content
		const binaryContent = atob(download.content)

		// Convert the decoded content to a Uint8Array
		const byteArray = new Uint8Array(binaryContent.length)
		for (let i = 0; i < binaryContent.length; i++) {
			byteArray[i] = binaryContent.charCodeAt(i)
		}

		// Create a Blob from the byteArray
		const blob = new Blob([byteArray], { type: download.contentType })

		// Create a URL from the Blob
		const url = URL.createObjectURL(blob)

		// Create a link element and trigger a download
		const link = document.createElement('a')
		link.href = url
		link.download = download.filename

		// Add headers for download
		link.setAttribute('Content-Disposition', `attachment; filename="${download.filename}"`)
		link.setAttribute('Content-Type', download.contentType)

		document.body.appendChild(link)
		link.click()

		// Clean up and revoke the object URL
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	return (
		<button onClick={downloadFile} className="px-3 py-2 inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			{t('label.download')}
		</button>
	)
}

DownloadComponent.propTypes = {
	module: PropTypes.string.isRequired,
	documentRef: PropTypes.string.isRequired,
}

export default DownloadComponent
