import api from './apiService'
import { Document } from '../entities/Document'
import { Download } from '../entities/Download'

const apiDocumentService = {
	getDocuments: async (module, ref) => {
		if (!api.validToken()) {
			return []
		}
		const items = await api
			.get(`/documents?modulepart=${module}&ref=${ref}`)
			.then((result) => {
				if (!Array.isArray(result.data)) {
					console.log('Axios Documents incorrect response: %o', result)
					return []
				}
				return result.data.map((item) => new Document(item))
			})
			.catch((error) => {
				throw new Error(`Axios Documents module error ${error.code}: ${error.message}`)
			})
		return items
	},

	getDocumentDownload: async (module, path) => {
		if (!api.validToken()) {
			throw new Error('Document download: missing api token')
		}
		const item = await api
			.get(`documents/download?modulepart=${module}&original_file=/${path}`)
			.then((result) => {
				return new Download(result.data)
			})
			.catch((error) => {
				throw new Error(`Axios Documents download error ${error.code}: ${error.message}`)
			})
		return item
	},
}

export default apiDocumentService
