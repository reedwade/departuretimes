import react from '@vitejs/plugin-react';
import { execSync } from "child_process";
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
// @ts-expect-error this works but vscode complains
import * as Package from "./package.json";


// Ref: https://vitejs.dev/config/

export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(Package.version),
        __APP_HASH__: JSON.stringify(execSync("git rev-parse --short HEAD").toString().trim()),
    },
    plugins: [
        react(),
        viteCompression({
            verbose: true,
            algorithm: 'gzip', // brotli is a little better but configuring nginx for this is a pain
        }),
    ],
});
