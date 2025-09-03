import { stripHtml } from '../../src/lib/utils.js'

describe('stripHtml', () => {
	it('should remove simple HTML tags', () => {
		const html = '<p>Hello, <strong>world</strong>!</p>'
		const expected = 'Hello, world!'
		expect(stripHtml(html)).toBe(expected)
	})

	it('should return an empty string for an empty HTML string', () => {
		const html = ''
		expect(stripHtml(html)).toBe('')
	})

	it('should handle strings with no HTML tags', () => {
		const text = 'This is a plain text string.'
		expect(stripHtml(text)).toBe(text)
	})

	it('should handle null and undefined inputs gracefully', () => {
		expect(stripHtml(null)).toBe('')
		expect(stripHtml(undefined)).toBe('')
	})

	it('should handle complex and nested HTML', () => {
		const html = '<div><span>Here is some <em>nested</em> content.</span></div>'
		const expected = 'Here is some nested content.'
		expect(stripHtml(html)).toBe(expected)
	})
})
