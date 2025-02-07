import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json'; // Asegúrate de tener este archivo disponible

export default defineConfig({

  plugins: [
    federation({
      name: 'host', // Nombre del host
      remotes: {
        remote: {
          type: 'module',
          name: 'remote',
          entry: 'https://auth.parfinanciero.crudzaso.com/remoteEntry.js', // URL del remote
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: dependencies.react },
        'react-dom': { singleton: true, requiredVersion: dependencies['react-dom'] },
      },
    }),
    react(),
  ],
 
  build: {
    target: 'chrome89',
  },

  // server: {
  //   host: '0.0.0.0',  // Permite que el servidor sea accesible externamente
  //   port: 8045, // Asegura que está en el puerto correcto
  //   cors: {
  //     origin: 'https://auth.parfinanciero.crudzaso.com', // Permite solicitudes desde el frontend remoto
  //     methods: 'GET, POST, OPTIONS',
  //     credentials: true,
  //   },
  //   proxy: {
  //     '/remoteEntry.js': {
  //       target: 'https://auth.parfinanciero.crudzaso.com',
  //       changeOrigin: true,
  //       secure: false, // Si hay problemas con HTTPS, prueba con `secure: true`
  //     },
  //   },
  // },


});
