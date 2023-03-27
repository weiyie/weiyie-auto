import path from "path";
import { UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

function resolve(dir: string) {
  return path.resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config

export default (): UserConfig => {
  return {
    base: "/",
    plugins: [
      vue(),
      compression(),
      vueJsx(),
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve("src/"),
        "#": resolve("types/"),
      },
    },
    server: {
      port: 8888,
      hmr: {
        overlay: true,
      },
    },
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      sourcemap: false,
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
};
