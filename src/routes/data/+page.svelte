<script lang="ts">
    import { ChartUtils, type Timeframe } from "$lib/date-utils";
    import MyChart from "$lib/my-chart.svelte";
    import Timepicker from "$lib/timepicker.svelte";
    import { onMount } from "svelte";

    let selected: Timeframe = $state("1D");

    const labels = ChartUtils.generateDates(selected);
    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    onMount(() => {
        const config = {
            type: "line",
            data: data,
        };
        // const chart = new Chart(ctx, config);
    });
</script>

<div class="flex items-center justify-center p-10">
    <div class="font-semibold">Air Quality Data</div>
</div>
<div class="flex items-center justify-center flex-col pb-10">
    <Timepicker bind:selected />
</div>

<div class="grid gap-5 px-5">
    {#each { length: 5 } as _}
        <section id="x" class="min-h-25">
            <div class="font-departure text-sm">CO2 [ppm]</div>
            <div>
                <MyChart timeframe={selected} />
            </div>
        </section>
    {/each}
</div>
