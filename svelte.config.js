/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors

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
    vitePlugin: {
        dynamicCompileOptions: ({ filename }) => (filename.includes("node_modules") ? undefined : { runes: true }),
    },
};

export default config;
