import { defineConfig, loadEnv } from 'vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => {
	const env = loadEnv(null, process.cwd())

	return {
		build: {
			assetsDir: env.VITE_BUILD_DIR,
			emptyOutDir: false,
			manifest: true,
			outDir: './public/',
			rollupOptions: {
				input: `./${env.VITE_RESOURCES_DIR}/${env.VITE_ENTRY_FILE}`,
			},
		},
		plugins: [
			vue(),
			Components({
				resolvers: [BootstrapVueNextResolver()],
			  }),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, `./${env.VITE_RESOURCES_DIR}`),
				zygot: path.resolve('vendor/dimtrovich/zygot/dist/vue.es.js'),
			},
		},
		server: {
			origin: env.VITE_ORIGIN,
			port: env.VITE_PORT,
			strictPort: true,
		},
	}
})

