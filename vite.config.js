import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { fileURLToPath } from 'url' // Import fileURLToPath để xử lý import.meta.url

// Chuyển đổi import.meta.url thành __dirname
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src') // Định nghĩa alias cho đường dẫn tuyệt đối
    }
  }
})