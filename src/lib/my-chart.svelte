<script lang="ts">
    import { Chart, registerables } from "chart.js";
    import { onDestroy, onMount } from "svelte";
    import { ChartUtils, type Timeframe } from "./date-utils";

    Chart.register(...registerables);

    export let timeframe: Timeframe = "1W";

    let canvas: HTMLCanvasElement;
    let chart: Chart | null = null;

    function createChart() {
        if (chart) {
            chart.destroy();
        }

        const labels = ChartUtils.generateDates(timeframe);
        const data = [
            {
                sensor_id: "444",
                fields: {
                    CO2: [
                        {
                            time: "2026-01-07T16:00:00Z",
                            value: 832.15,
                        },
                        {
                            time: "2026-01-07T16:05:00Z",
                            value: 831.3,
                        },
                        {
                            time: "2026-01-07T16:05:00Z",
                            value: 830.84,
                        },
                        {
                            time: "2026-01-07T16:05:00Z",
                            value: 830.86,
                        },
                        {
                            time: "2026-01-07T16:05:00Z",
                            value: 830.01,
                        },
                        {
                            time: "2026-01-07T16:05:00Z",
                            value: 829.61,
                        },
                        {
                            time: "2026-01-07T16:10:00Z",
                            value: 829.89,
                        },
                    ],
                },
            },
        ];

        chart = new Chart(canvas, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "CO2",
                        data: data[0].fields.CO2.map((x) => x.value),
                        // parsing: {
                        // xAxisKey: "time",
                        // yAxisKey: "value",
                        // },

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
    $: if (canvas && timeframe) {
        createChart();
    }
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
