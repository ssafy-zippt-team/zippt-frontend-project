const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    proxy: {
      // 기존 백엔드 API
      "^/api": { target: "http://localhost:8080", changeOrigin: true },
      // 카카오 로컬 API
      "^/kakao": {
        target: "https://dapi.kakao.com",
        changeOrigin: true,
        secure: true,
        pathRewrite: { "^/kakao": "" }
      }
    },
  },
});
