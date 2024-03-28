import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const env = {
  BASE_URL: process.env.REACT_APP_BASE_URL
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Alias the environment variables for the production build
    __APP_BASE_URL__: env.BASE_URL,
  },
})
