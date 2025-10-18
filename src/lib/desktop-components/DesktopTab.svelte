<script lang='ts'>
    import { page } from '$app/state';
    import { afterNavigate } from '$app/navigation';
    import { onMount } from 'svelte';
    import { Spring } from 'svelte/motion'; // built-in reactive animation store

    const tabs = [
		{ id: 'home', path: '/' },
		{ id: 'about', path: '/about' },
		{ id: 'projects', path: '/projects' },
        { id: 'design', path: '/design' },
    ];

    // DOM element bindings
    let tabRefs: HTMLDivElement[] = [];
    let tabsContainerRef: HTMLDivElement;

    const stiff = 0.075; 
    const damp  = 0.3; 

    const highlightX = new Spring(0, { stiffness: stiff, damping: damp });
    const highlightY = new Spring(0, { stiffness: stiff, damping: damp });
    const highlightWidth = new Spring(0, { stiffness: stiff, damping: damp });
    const highlightHeight = new Spring(0, { stiffness: stiff, damping: damp });

    // const active = tabs.find(
    //     (tab) => tab && tab.path === page.url.pathname
    // )
    
    function updateHighlight(act: HTMLButtonElement, big: HTMLDivElement) {
        const boundingBox = act.getBoundingClientRect(); 
        const biggieBoundingBox = big.getBoundingClientRect(); 
        highlightX.target = boundingBox.left - biggieBoundingBox.left; 
        highlightY.target = boundingBox.top - biggieBoundingBox.top; 
        highlightWidth.target = boundingBox.right-boundingBox.left; 
        highlightHeight.target = boundingBox.bottom-boundingBox.top; 
    }

    let active: HTMLButtonElement; 
    let biggie: HTMLDivElement; 

    onMount(() => {
        window.addEventListener('resize', () => updateHighlight(active, biggie));
        updateHighlight(active, biggie); 
        return () => window.removeEventListener('resize', () => updateHighlight(active, biggie));
    });
    afterNavigate(() => {
        window.addEventListener('resize', () => updateHighlight(active, biggie));
        updateHighlight(active, biggie); 
        return () => window.removeEventListener('resize', () => updateHighlight(active, biggie));
    });
</script>

<nav class="w-screen flex flex-row content-center py-0">
    <div class="mx-auto my-4 flex flex-row content-center bg-black/5 rounded-full gap-4 p-2">
        <div class="bg-black/10 px-3 py-1.5 rounded-full transition duration-300 hover:scale-90 active:scale-75">etash jhanji</div>
        <div bind:this={biggie} class="relative flex flex-row content-center rounded-full ">
            <!-- Floating highlight -->
            <div
                class="absolute top-2 bottom-2 bg-black rounded-full pointer-events-none z-0"
                style="
                    transform: translateX({highlightX.current}px);
                    top: 0px; 
                    width: {highlightWidth.current}px; 
                    height: {highlightHeight.current}px;
                "
            >.</div>
            {#each tabs as tab}
            <!--class:bg-black={page.url.pathname===tab.path} -->
                {#if page.url.pathname===tab.path}
                    <button bind:this={active} id={tab.id} class="z-10 px-3 py-1.5 text-white rounded-full transition duration-300 hover:scale-110 active:scale-90">
                        <a href={tab.path} class='selected'>{tab.id}</a>
                    </button>
                {:else}
                    <button id={tab.id} class="px-3 py-1.5 rounded-full transition duration-300 hover:scale-110 active:scale-90" onclick={()=>updateHighlight(active, biggie)}>
                        <a href={tab.path}>{tab.id}</a>
                    </button>
                {/if}
            {/each}
        </div>
    </div>
</nav>