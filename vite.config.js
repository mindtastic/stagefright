import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        proxy: {
            '/foo': 'http://localhost:8000',
            '/dev': {
                target: 'https://auth.api.dev.mindtastic.lol',
                changeOrigin: true,
                secure: false,
                ws: true,
                rewrite: (path) => path.replace('/dev', '')
            },
            '/stage': {
                target: 'https://auth.api.stage.mindtastic.lol',
                changeOrigin: true,
                secure: false,
                ws: false,
                rewrite: (path) => path.replace('/stage', '')
            },
            '/live': {
                target: 'https://auth.api.live.mindtastic.lol',
                changeOrigin: true,
                secure: false,
                ws: false,
                rewrite: (path) => path.replace('/live', '')
            }
        }
    }
})