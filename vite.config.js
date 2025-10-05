import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    base: '/lottie-editor-demo/',
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets'
    }
});
