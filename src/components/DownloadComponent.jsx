import PropTypes from 'prop-types'

const DownloadComponent = ({ jsonResponse }) => {
	const downloadFile = () => {
		// Decode the base64 content
		const pdfContent = atob(jsonResponse.content)

		// Convert the decoded content to a Uint8Array
		const byteArray = new Uint8Array(pdfContent.length)
		for (let i = 0; i < pdfContent.length; i++) {
			byteArray[i] = pdfContent.charCodeAt(i)
		}

		// Create a Blob from the byteArray
		const blob = new Blob([byteArray], { type: jsonResponse['content-type'] })

		// Create a URL from the Blob
		const url = URL.createObjectURL(blob)

		// Create a link element and trigger a download
		const link = document.createElement('a')
		link.href = url
		link.download = jsonResponse.filename

		// Add headers for download
		link.setAttribute('Content-Disposition', `attachment; filename="${jsonResponse.filename}"`)
		link.setAttribute('Content-Type', jsonResponse['content-type'])

		document.body.appendChild(link)
		link.click()

		// Clean up and revoke the object URL
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	return <button onClick={downloadFile}>Download</button>
}

DownloadComponent.propTypes = {
	jsonResponse: PropTypes.jsonResponse,
}

export default DownloadComponent
