import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // 서비스 워커 자동 업데이트
      devOptions: {
        enabled: true, // 개발 환경에서도 PWA 테스트 가능하게 설정
      },
      manifest: {
        name: "pickify", // 앱 이름
        short_name: "pickify",
        description: "내 주변 트렌디한 매거진 플레이스",
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
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
