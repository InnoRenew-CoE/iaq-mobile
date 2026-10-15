<script lang="ts">
    import { type Timeframe } from "$lib/date-utils";
    import MyChart from "$lib/my-chart.svelte";
    import { getToken, selectedLanguage } from "$lib/stores/user";
    import Timepicker from "$lib/timepicker.svelte";
    import { onMount } from "svelte";

    const content = {
        english: {
            title: "Air Quality Data",
            lastMeasurements: "Last measurements",
            noData: "No data available",
            missingToken: "Missing token data",
            locale: "en-GB",
            metrics: {
                temperature: "Temperature",
                humidity: "Humidity",
                CO2: "CO2",
                VOC_index: "VOC index"
            }
        },
        slovenian: {
            title: "Podatki o kakovosti zraka",
            lastMeasurements: "Zadnje meritve",
            noData: "Podatki niso na voljo",
            missingToken: "Manjkajo podatki o žetonu",
            locale: "sl-SI",
            metrics: {
                temperature: "Temperatura",
                humidity: "Vlažnost",
                CO2: "CO2",
                VOC_index: "VOC indeks"
            }
        }
    } as const;

    // undefined falls back to english
    const t = $derived(content[$selectedLanguage ?? "english"]);

    // known metrics get a translated label, anything else falls back to the cleaned-up key
    function metricLabel(key: string): string {
        return (t.metrics as Record<string, string>)[key] ?? key.replaceAll(/[^a-zA-Z0-9]/gi, " ");
    }

    let selected: Timeframe = $state("1W");

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
        // console.log(await data.text());
        if (!token) alert(t.missingToken);
        chartData = await data.json();
        console.log(chartData);
    }

    $effect(() => {
        if (selected) {
            fetchData();
        }
    });

    const ORDER = ["temperature", "humidity", "CO2", "VOC_index"];

    function sortByOrder(arr: string[]): string[] {
        return [...arr].sort((a, b) => {
            const indexA = ORDER.indexOf(a);
            const indexB = ORDER.indexOf(b);

            const rankA = indexA === -1 ? ORDER.length : indexA;
            const rankB = indexB === -1 ? ORDER.length : indexB;

            return rankA - rankB;
        });
    }
</script>

<div class="flex items-center justify-center p-10">
    <div class="font-semibold">{t.title}</div>
</div>
<div class="flex items-center justify-center flex-col pb-10">
    <Timepicker bind:selected />
</div>

<div class="grid gap-5 px-5">
    {#if chartData && getToken() && JSON.stringify(chartData) !== "[]"}
        <div class="grid gap-3 p-5">
            <div class="font-light opacity-40 uppercase text-xs">{t.lastMeasurements}</div>
            <div class="flex gap-3 items-center justify-center flex-wrap">
                {#each sortByOrder(Object.keys(chartData)).filter((x) => ORDER.includes(x)) as key (key)}
                    {@const array = chartData[key] ?? []}
                    {@const lastData = array.at(-1)}
                    <div class="bg-white p-2 rounded-lg shadow-sm text-center">
                        <div class="text-lg font-light text-blue-400">{lastData.value.toFixed(2)}</div>
                        <div class="text-center font-bold capitalize">{metricLabel(key)}</div>
                        <div class="text-xs opacity-40">{new Date(lastData.time).toLocaleString(t.locale)}</div>
                    </div>
                {/each}
            </div>
        </div>
        {#each sortByOrder(Object.keys(chartData).filter((x) => !["uptime", "sync_flag"].includes(x))) as key, i (key)}
            <section id="x" class="min-h-25">
                <div class="font-departure text-sm capitalize">{metricLabel(key)}</div>
                <div>
                    <MyChart timeframe={selected} data={chartData[key]} label={metricLabel(key)} />
                </div>
            </section>
        {/each}
    {:else}
        <div class="flex items-center justify-center opacity-40">{t.noData}</div>
    {/if}
</div>