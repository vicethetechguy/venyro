import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Robustly define process.env for browser context
      'process.env': {
        // Fallback chain for different deployment environment patterns
        API_KEY: JSON.stringify(env.API_KEY || env.VITE_API_KEY || ''),
        NODE_ENV: JSON.stringify(mode),
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      // Optimize rollup to handle large dependencies gracefully
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'recharts', 'lucide-react'],
          },
        },
      },
    },
    server: {
      port: 3000,
    }
  };
});