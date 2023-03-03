/// <reference types="vitest" />
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * @name @lemanh-tuong
 * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
 */
if (process.env.npm_lifecycle_event === 'build' && !process.env.CI && !process.env.SHOPIFY_API_KEY) {
  console.warn(
    '\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n',
  );
}
/** <------------------------------------------------------------------------------------------> */

/**
 * @name @lemanh-tuong
 * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
 */
const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false,
};
/** <------------------------------------------------------------------------------------------> */

/**
 * @name @lemanh-tuong
 * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
 */
const host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, '') : 'localhost';
/** <------------------------------------------------------------------------------------------> */

/**
 * @name @lemanh-tuong
 * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
 */
let hmrConfig;
if (host === 'localhost') {
  hmrConfig = {
    protocol: 'ws',
    host: 'localhost',
    port: 64999,
    clientPort: 64999,
  };
} else {
  hmrConfig = {
    protocol: 'wss',
    host: host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443,
  };
}
/** <------------------------------------------------------------------------------------------> */

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  // NOTE: CommonJS module in node_modules
  // optimizeDeps: {
  //   esbuildOptions: {
  //     plugins: [esbuildCommonjs([])],
  //   },
  // },
  // WARNING: Update hàm generateEnvFiles.js nếu muốn tuỳ chỉnh trường này
  envPrefix: '_____ADDITIONAL_VARIABLE______',

  /**
   * @name @lemanh-tuong
   * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
   */
  root: dirname(fileURLToPath(import.meta.url)),
  plugins: [react(), viteCommonjs(), tsconfigPaths()],
  define: {
    'process.env.SHOPIFY_API_KEY': JSON.stringify(process.env.SHOPIFY_API_KEY),
  },
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    host: 'localhost',
    // DANGER: Không nên update
    port: process.env.FRONTEND_PORT,
    hmr: hmrConfig,
    proxy: {
      '^/(\\?.*)?$': proxyOptions,
      '^/api(/|(\\?.*)?$)': proxyOptions,
    },
  },
  /** <------------------------------------------------------------------------------------------> */
});
