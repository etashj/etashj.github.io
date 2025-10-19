<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/fuecoco.png';
	import { onMount } from 'svelte';

	let { children } = $props();

	import DesktopNavBar from '$lib/desktop-components/DesktopNav.svelte';
	import MobileNavBar from '$lib/mobile-components/MobileNav.svelte';

	let isMobile = $state(false); 

	onMount(() => {
		isMobile = window.innerWidth < 530; 
		addEventListener("resize", () => {
			isMobile = window.innerWidth < 530; 
		});
	})
</script>


{#if !isMobile}
	<DesktopNavBar />
{:else}
	<MobileNavBar />
{/if}

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-full min-h-full h-full dark:bg-black dark:text-white p-16 flex-grow flex flex-col justify-center">
	{@render children?.()}
</div>
