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
        pathRewrite: { "^/kakao": "" },
      },
      // 네이버 오픈API 프록시 추가
      "^/v1": {
        target: "https://openapi.naver.com/",
        changeOrigin: true,
      },
    },
  },
});
