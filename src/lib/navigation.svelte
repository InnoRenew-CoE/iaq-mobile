<script lang="ts">
    import SvgIcon from "./svg-icon.svelte";

    const buttons = [
        { icon: "./home.svg", title: "Home", path: "/" },
        { icon: "./nav-chart.svg", title: "Data", path: "/data" },
        { icon: "./feedback.svg", title: "Form", path: "/form" },
        // { icon: "./nav-chart.svg", title: "Data", path: "/data" },
    ];
</script>

<div class="fixed bottom-0 p-5 flex items-center justify-center w-full">
    <ul class="flex gap-6 bg-white/80 backdrop-blur-sm py-2 px-5 rounded-full">
        {#each buttons as button}
            <a href={button.path}>
                <li class="flex-col flex items-center justify-center">
                    <SvgIcon src={button.icon} class="size-5 bg-primary" />
                    <div class="text-[10px] font-mono">{button.title}</div>
                </li>
            </a>
        {/each}
    </ul>
</div>
