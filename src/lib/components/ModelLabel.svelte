<script lang="ts">
    export let path: string;

    let name: string = '';
    $: {
        if (path) {
            // Extract the filename from the path for display.
            name = path.split('/').pop() || '';
        }
    }
</script>

{#if name && path}
    <div class="text-xs fixed bottom-4 right-4 z-20 w-fit text-center dark:text-white text-black bg-black/5 dark:bg-white/15 bg-black-5 px-3 py-2 rounded-lg transition duration-300 hover:scale-105 active:scale-95 shadow-lg">
        <div>
            You're looking at 
            <a
                href={path}
                download
                rel="external"
                class="font-mono underline decoration-dashed"
            >
                {name}
            </a>
        </div>
        <div class="text-gray-600 dark:text-gray-400">Drag on the model to move it</div>
    </div>
{/if}
