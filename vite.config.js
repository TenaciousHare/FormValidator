const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  root: path.resolve(__dirname, "src"),
  base: "/FormValidator/",
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  build: {
    outDir: "../build",
    assetsDir: "./assets",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$primary: #28587B;
        $white: #FAFAFF;
        
        .alert.alert-danger{
            display: none;
        }`,
      },
    },
  },
  server: {
    port: 8080,
    host: true,
  },
});
