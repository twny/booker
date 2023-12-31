import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  root: './src',
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: parseInt(process.env.PORT || "3000"),
    host: "0.0.0.0",
    proxy: {
      // Using the proxy instance
      '/api/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    }
  },
  build: {
    target: 'esnext',
    outDir: path.resolve(__dirname, '../../dist/client'),
    emptyOutDir: true
  },
});
