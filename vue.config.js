const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/acai_roots',
  transpileDependencies: true

}),
module.exports = {
  devServer: {
    port: 8080, // Configura a porta do servidor de desenvolvimento
  },
};

