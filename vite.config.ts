import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      // Exclude dependencies and peerDependencies from bundle as these will be installed by the consumer
      external: [
        'gsap',
        'react',
        'react/jsx-runtime',
        'react-dom',
        'scheduler',
        'use-context-selector',
      ],
    },
  },
  plugins: [
    react(),
    dts({
      compilerOptions: {
        baseUrl: './src/',
        emitDeclarationOnly: true,
        noEmit: false,
      },
      outputDir: 'dist/types',
      exclude: ['src/vite-env.d.ts'], // Exclude global types used for dev
    }),
  ],
});
