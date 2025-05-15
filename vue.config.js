const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    proxy: {
      // '/api' 로 시작하는 모든 요청을 target 으로 보내고
      "^/api": {
        target: "http://localhost:8080",
        changeOrigin: true, // Host 헤더를 target 으로 바꿔줌
        secure: false, // https 인증서 무시 (필요시)
        // pathRewrite: { "^/api": "/api" }, // 필요 없다면 주석 처리
      },
    },
  },
});
