import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// load env vars from .env.local and add .env vars
dotenv.config({ path: ['.env.local', '.env'] })

let host = new URL(process.env.LOCAL_URL).host.split(':')[0]
let port = new URL(process.env.LOCAL_URL).port

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		'process.env.SITE_URL': `"${process.env.SITE_URL}"`,
		'process.env.LOCALE': `"${process.env.LOCALE}"`,
		'process.env.CURRENCY': `"${process.env.CURRENCY}"`,
	},
	server: {
		host: host,
		port: port,
		// @see https://github.com/http-party/node-http-proxy#options
		proxy: {
			'/api': {
				target: process.env.API_URL,
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	// test: {
	// 	globals: true,
	// 	environment: 'jsdom',
	// 	setupFiles: './jest-setup.js',
	// },
})
