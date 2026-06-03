<script lang="ts">
    import { page } from "$app/state";
    import SvgIcon from "./svg-icon.svelte";

    const buttons = [
        { icon: "./home.svg", title: "Home", path: "/" },
        { icon: "./nav-chart.svg", title: "Data", path: "/data" },
        // { icon: "./feedback.svg", title: "Form", path: "/form" },
        // { icon: "./nav-chart.svg", title: "Data", path: "/data" },
    ];
</script>

<div class="fixed bottom-0 p-5 flex items-center justify-center w-full">
    <ul class="flex gap-10 bg-white/80 dark:bg-stone-900 backdrop-blur-xs py-2 px-8 rounded-full">
        {#each buttons as button}
            {@const isSelected = page.route.id === button.path}
            <a href={button.path}>
                <li class="{isSelected ? 'font-bold text-indigo-500 dark:text-indigo-300' : ''} flex-col flex items-center justify-center">
                    <SvgIcon src={button.icon} class="size-5 bg-black dark:bg-white {isSelected ? 'bg-indigo-500 dark:bg-indigo-300' : ''}" />
                    <div class="text-[10px] font-mono">{button.title}</div>
                </li>
            </a>
        {/each}
    </ul>
</div>
