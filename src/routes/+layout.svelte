<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
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

{@render children?.()}
