<script lang="ts">
    import { type Timeframe } from "$lib/date-utils";
    import MyChart from "$lib/my-chart.svelte";
    import Timepicker from "$lib/timepicker.svelte";
    import { onMount } from "svelte";

    let selected: Timeframe = $state("1D");

    let chartData = $state(undefined);
    // F8B3B7C6A138
    onMount(async () => {
        // const chart = new Chart(ctx, config);
        await fetchData();
    });

    async function fetchData() {
        console.log(`https://data.iaq.innorenew.eu/citizens_science/api.php?id=F8:B3:B7:C6:1A:38&time=${selected}`);
        const data = await fetch(`https://data.iaq.innorenew.eu/citizens_science/api.php?id=F8:B3:B7:C6:1A:38&time=${selected}`);
        chartData = await data.json();
        console.log(chartData["CO2"].map((x) => x.time));
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
    {#if chartData}
        {#each Object.keys(chartData).filter((x) => x !== "uptime") as key, i (key)}
            <section id="x" class="min-h-25">
                <div class="font-departure text-sm capitalize">{key.replaceAll(/[^a-zA-Z0-9]/gi, " ")}</div>
                <div>
                    <MyChart timeframe={selected} data={chartData[key]} />
                </div>
            </section>
        {/each}
    {/if}
</div>
