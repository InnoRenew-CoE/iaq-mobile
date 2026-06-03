<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import type { Timeframe } from "./date-utils";

    const options: Timeframe[] = ["1D", "1W", "1M", "6M"];
    let { selected = $bindable() }: { selected: Timeframe } = $props();
</script>

<div class="flex gap-3 bg-stone-50 p-1 rounded-2xl shadow-sm">
    {#each options as option}
        {@const isSelected = option === selected}
        <div
            onclick={() => {
                selected = option;
            }}
            in:slide
            out:fade
            class="uppercase text-sm p-2 rounded-xl {isSelected ? 'bg-white shadow-sm ' : ''}"
        >
            {option}
        </div>
    {/each}
</div>
