<script lang="ts">
    import { twMerge } from "tailwind-merge";

    let { src = "./home.svg", class: className = "" } = $props();
</script>

<div class="size-1 z-0 masked-svg {twMerge('bg-red-500', className)}" style="-webkit-mask-image: url({src});"></div>

<style>
    .masked-svg {
        -webkit-mask-size: 100% !important;
        -webkit-mask-repeat: no-repeat;
        -webkit-mask-position: center;
    }
</style>
