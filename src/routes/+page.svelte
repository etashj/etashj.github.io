<script lang="ts">
    import AsciiModel from "$lib/components/AsciiModel.svelte";
    import { isHindi } from '$lib/scripts/language';
    import { onMount } from 'svelte';
    import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

    const {
        elements: { trigger, content, arrow },
        states: { open },
    } = createTooltip({
        positioning: {
        placement: 'top',
        },
        openDelay: 0,
        closeDelay: 0,
        closeOnPointerDown: false,
        forceVisible: true,
    });

    let modelPath: string | null = null;

    onMount(async () => {
        try {
            const response = await fetch('/models.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const models: string[] = await response.json();
            if (models.length > 0) {
                const randomModel = models[Math.floor(Math.random() * models.length)];
                modelPath = `/models/${randomModel}`;
            }
        } catch (error) {
            console.error("Failed to fetch or process models.json:", error);
            // As a fallback, you could load a default model here
            // modelPath = '/models/mew.stl';
        }
    });
</script>


    <div class=" z-10 rounded-2xl p-4">
        <div class="w-fit max-w-fit text-6xl xs:text-7xl" use:melt={$trigger}>
            {#if $isHindi}
                इताश झांजी
            {:else}
                etash jhanji
            {/if}
        </div>
        {#if $open}
        <div
            use:melt={$content}
            transition:fade={{ duration: 100 }}
            class=" z-110 rounded-lg bg-black dark:bg-white shadow text-white dark:text-black "
        >
            <div use:melt={$arrow} ></div>
            <p class="px-4 py-1 font-mono text-lg">[it̪ɑːɕ ɟʰɑːⁿɟiː]</p>
        </div>
        {/if}
        <div class="xs:text-2xl">
            {#if !$isHindi}
                इताश झांजी
            {:else}
                etash jhanji
            {/if} • cs @ cmu
        </div>
        <br>
        <p class="text-sm xs:text-base">+ <a target="_blank" class="underline decoration-dashed" href="mailto:etash@cmu.edu">etash@cmu.edu</a></p>
        <p class="text-sm xs:text-base">+ <a target="_blank" class="underline decoration-dashed" href="https://linkedin.com/in/etashj">linkedin.com/etashj</a></p>
        <p class="text-sm xs:text-base">+ <a target="_blank" class="underline decoration-dashed" href="https://github.com/etashj/">github.com/etashj</a></p>
        <p class="text-sm xs:text-base">+ <a target="_blank" class="underline decoration-dashed" href="https://instagram.com/etashj/">instagram.com/etashj</a></p>
        <br>
       
        <a href="/about" target="_blank" class="group block w-fit mb-2"><div class="w-fit max-w-fit flex flex-row gap-1 text-center dark:text-white text-black bg-black/5 dark:bg-white/15 bg-black-5 px-3 py-1 rounded-full transition duration-300 group-hover:scale-105 group-active:scale-90">
            about  <div class="group-hover:translate-x-0.5 transition duration-150">→</div>
        </div></a>
        <a href="/ejhanji_resume.pdf" target="_blank" rel="external" class="group block w-fit"><div class="flex flex-row gap-1 w-fit text-center dark:text-white text-black bg-black/5 dark:bg-white/15 bg-black-5 px-3 py-1 rounded-full transition duration-300 group-hover:scale-105 group-active:scale-90">
            resume  <div class="group-hover:translate-x-0.5 transition duration-150">→</div>
        </div></a>
    </div>
    {#if modelPath}
        <AsciiModel stlPath={modelPath} />
    {:else}
        <!-- Optional: show a placeholder or nothing while loading -->
    {/if}