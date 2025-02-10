import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ⬅ 절대경로 설정
    },
  },
  optimizeDeps: {
    exclude: ["react-cookie"],
  },
});
