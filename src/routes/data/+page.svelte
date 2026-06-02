<script lang="ts">
    import { type Timeframe } from "$lib/date-utils";
    import MyChart from "$lib/my-chart.svelte";
    import { getToken } from "$lib/stores/user";
    import Timepicker from "$lib/timepicker.svelte";
    import { onMount } from "svelte";

    let selected: Timeframe = $state("1D");

    let chartData: any | undefined = $state(undefined);
    // F8B3B7C6A138
    onMount(async () => {
        // const chart = new Chart(ctx, config);
        await fetchData();
    });

    async function fetchData() {
        const token = getToken();
        const url = `https://data.iaq.innorenew.eu/citizens_science/api.php?id=${token}&time=${selected}`;
        const data = await fetch(url);
        if (!token) alert("Missing token data");
        chartData = await data.json();
    }

    $effect(() => {
        if (selected) {
            fetchData();
        }
    });
</script>

<div class="flex items-center justify-center p-10">
    <div class="font-semibold">Air Quality Data</div>
</div>
<div class="flex items-center justify-center flex-col pb-10">
    <Timepicker bind:selected />
</div>

<div class="grid gap-5 px-5">
    {#if chartData && getToken()}
        {#each Object.keys(chartData).filter((x) => x !== "uptime") as key, i (key)}
            <section id="x" class="min-h-25">
                <div class="font-departure text-sm capitalize">{key.replaceAll(/[^a-zA-Z0-9]/gi, " ")}</div>
                <div>
                    <MyChart timeframe={selected} data={chartData[key]} />
                </div>
            </section>
        {/each}
    {:else}
        <div>No data available</div>
    {/if}
</div>
