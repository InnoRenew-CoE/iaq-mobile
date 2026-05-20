import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        adapter: {
            name: "@sveltejs/adapter-static",
            async adapt(builder) {
                return import("@sveltejs/adapter-static").then((v) => {
                    return v
                        .default({
                            pages: "build",
                            assets: "build",
                            fallback: "index.html",
                            precompress: false,
                            strict: true,
                        })
                        .adapt(builder);
                });
            },
        },
    },
};

export default config;
