/**
 * Strips HTML tags from a string.
 * @param {string} html The HTML string to strip.
 * @returns {string} The text content without HTML tags.
 */
export const stripHtml = (html) => {
	if (typeof DOMParser === 'undefined' || !html) return html || ''
	const doc = new DOMParser().parseFromString(html, 'text/html')
	return doc.body.textContent || ''
}
