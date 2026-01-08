<script lang="ts">
    import { fade, slide } from "svelte/transition";

    const options = ["1d", "1w", "1m", "6m"];
    let { selected = $bindable() } = $props();
</script>

<div class="flex gap-3 bg-stone-50 dark:bg-stone-600 p-1 rounded-2xl shadow-sm">
    {#each options as option}
        {@const isSelected = option === selected}
        <div
            onclick={() => {
                selected = option;
            }}
            in:slide
            out:fade
            class="uppercase text-sm p-2 rounded-xl {isSelected ? 'bg-white dark:bg-stone-500 shadow-sm ' : ''}"
        >
            {option}
        </div>
    {/each}
</div>
