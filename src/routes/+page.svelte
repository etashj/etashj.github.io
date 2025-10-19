<script lang="ts">
    import AsciiModel from "$lib/components/AsciiModel.svelte";
    import { isHindi } from '$lib/scripts/language';
</script>


    <div class=" z-10 rounded-2xl p-4">
        <div class="w-fit max-w-fit text-6xl xs:text-7xl">
            {#if $isHindi}
                इताश झांजी
            {:else}
                etash jhanji
            {/if}
        </div>
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
    <AsciiModel />