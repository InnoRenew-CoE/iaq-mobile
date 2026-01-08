<script lang="ts">
    import Timepicker from "$lib/timepicker.svelte";

    let selected = $state("1d");
</script>

<div class="flex items-center justify-center p-10">
    <div class="font-semibold">Air Quality Data</div>
</div>
<div class="flex items-center justify-center flex-col pb-10">
    <Timepicker bind:selected />
</div>

<div class="grid gap-5 px-10">
    {#each { length: 5 } as _}
        <section id="x" class="min-h-25">
            <div class="font-departure text-sm">Particle 1</div>
            <div>... chart ...</div>
        </section>
    {/each}
</div>
