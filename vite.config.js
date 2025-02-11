import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ⬅ 절대경로 설정
    },
  },
  optimizeDeps: {
    exclude: ["react-cookie"],
  },
});
