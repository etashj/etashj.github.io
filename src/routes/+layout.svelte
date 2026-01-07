<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/fuecoco.png';
	import { onMount } from 'svelte';
	import { innerWidth } from 'svelte/reactivity/window';

	let { children } = $props();

	import DesktopNavBar from '$lib/desktop-components/DesktopNav.svelte';
	import MobileNavBar from '$lib/mobile-components/MobileNav.svelte';

	let isMobile = $state(false);

	onMount(() => {
		isMobile = window.innerWidth < 530;
		addEventListener('resize', () => {
			isMobile = window.innerWidth < 530;
		});
	});
</script>

{#if (innerWidth && innerWidth.current! > 530) || !isMobile}
	<DesktopNavBar />
{:else}
	<MobileNavBar />
{/if}

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>etash jhanji</title>
	<meta property="og:title" content="etash jhanji" />
	<meta property="og:description" content="cs @ cmu" />
	<meta property="og:image" content="$lib/assets/fuecoco.png" />
	<meta property="og:url" content="http://etashj.github.io/" />
	<meta property="og:logo" content="$lib/assets/fuecoco.png" />
	<meta property="og:type" content="website" />
</svelte:head>

<div
	class="flex h-full min-h-full w-full flex-grow flex-col items-start justify-center p-4 pt-24 xs:p-16 xs:pt-24 dark:bg-black dark:text-white"
>
	{@render children?.()}
</div>
