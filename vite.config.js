import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({

  plugins: [

    react(),
    tailwindcss()

  ],

  server: {

    port: 5173,

    host: '0.0.0.0',

    strictPort: true,

    hmr: {
      clientPort: 443
    },

    proxy: {

      '/api': {

        target: 'http://localhost:3000',

        changeOrigin: true

      },

      '/socket.io': {

        target: 'http://localhost:3000',

        ws: true,

        changeOrigin: true

      },

    },

  },

});