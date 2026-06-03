<script lang="ts">
    import { Chart, registerables, type TimeUnit } from "chart.js";
    import "chartjs-adapter-date-fns";
    import { onDestroy, onMount } from "svelte";
    import { type Timeframe } from "./date-utils";

    let { timeframe = $bindable("1D"), label = "CO2", data }: { timeframe: Timeframe; label: string; data: { value: any; time: string }[] | undefined } = $props();
    Chart.register(...registerables);

    let canvas: HTMLCanvasElement;
    let chart: any | null = null;

    const unitMap: Record<Timeframe, string> = {
        "1D": "hour",
        "1W": "day",
        "1M": "week",
        "6M": "month",
    };

    function createChart() {
        if (chart) {
            chart.destroy();
        }

        if (!data) return;

        chart = new Chart(canvas, {
            type: "line",
            data: {
                // labels: labels,
                datasets: [
                    {
                        label: label,
                        data: data.map((d) => ({ ...d, time: new Date(d.time) })),
                        parsing: {
                            xAxisKey: "time",
                            yAxisKey: "value",
                        },

                        borderColor: "#ff00ff",
                        borderWidth: 2,
                        pointRadius: 4,
                        pointBackgroundColor: "#ff00ff",
                        pointBorderColor: "#fff",
                        pointBorderWidth: 2,
                        pointHoverRadius: 6,
                        tension: 0.4,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: false,
                    },
                    x: {
                        type: "time",
                        time: {
                            unit: unitMap[timeframe] as TimeUnit,
                            tooltipFormat: "dd MMM yyyy HH:mm",
                            displayFormats: {
                                minute: "HH:mm",
                                hour: "HH:mm",
                                day: "dd MMM",
                            },
                        },
                    },
                },
            },
        });
    }

    onMount(() => {
        createChart();
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });

    // Recreate chart when timeframe changes
    $effect(() => {
        if (timeframe) {
            createChart();
        }
    });
</script>

<div class="chart-container">
    <canvas bind:this={canvas}></canvas>
</div>

<style>
    .chart-container {
        width: 100%;
        height: 400px;
    }
</style>
