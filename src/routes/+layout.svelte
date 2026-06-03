<script lang="ts">
    import { afterNavigate } from "$app/navigation";
    import { page } from "$app/state";
    import favicon from "$lib/assets/favicon.svg";
    import Navigation from "$lib/navigation.svelte";
    import { getToken, saveToken, tokenStore } from "$lib/stores/user";
    import { onMount } from "svelte";
    import "../app.css";

    let { children } = $props();
    onMount(async () => {
        getToken();
        const token = page.url.searchParams.get("token");
        if (token) {
            saveToken(token);
        }
    });

    afterNavigate(() => {
        // Send metrics
        const path = page.route.id;
        const time = Date.now();
        console.log({
            path: path,
            time: time,
            token: getToken(),
        });
    });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="min-h-screen bg-stone-100 pb-30">
    {#if !$tokenStore}
        <div class="p-20 text-center h-screen flex items-center justify-center">Please scan the QR code you were provided with</div>
    {:else}
        {@render children()}
        <Navigation />
    {/if}
</div>
