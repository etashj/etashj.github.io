<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion'; // built-in reactive animation store
	import { isHindi, toggleHindi } from '$lib/scripts/language';
	import { resolve } from '$app/paths';

	// All site routes accessibel by tabs
	const tabs = [
		{ id: 'home', path: '/' },
		{ id: 'about', path: '/about' },
		{ id: 'projects', path: '/projects' },
		{ id: 'design', path: '/design' },
		{ id: 'blog', path: '/blog' }
	];

	// Sprinnginess of tab bar selection highlight
	const stiff = 0.075;
	const damp = 0.3;

	////// Floating Nav Bar Logic //////
	const highlightX = new Spring(0, { stiffness: stiff, damping: damp });
	const highlightY = new Spring(0, { stiffness: stiff, damping: damp });
	const highlightWidth = new Spring(0, { stiffness: stiff, damping: damp });
	const highlightHeight = new Spring(0, { stiffness: stiff, damping: damp });

	function updateHighlight(act: HTMLButtonElement, big: HTMLDivElement) {
		const boundingBox = act.getBoundingClientRect();
		const biggieBoundingBox = big.getBoundingClientRect();
		highlightX.target = boundingBox.left - biggieBoundingBox.left;
		highlightY.target = boundingBox.top - biggieBoundingBox.top;
		highlightWidth.target = boundingBox.right - boundingBox.left;
		highlightHeight.target = boundingBox.bottom - boundingBox.top;
	}

	let active = $state<HTMLButtonElement | null>(null);
	let biggie: HTMLDivElement;

	// Run the code whenever mounter or when the page changes
	onMount(() => {
		window.addEventListener('resize', () => updateHighlight(active!, biggie));
		updateHighlight(active!, biggie);
		return () => window.removeEventListener('resize', () => updateHighlight(active!, biggie));
	});
	afterNavigate(() => {
		// window.addEventListener('resize', () => updateHighlight(active, biggie));
		updateHighlight(active!, biggie);
		// return () => window.removeEventListener('resize', () => updateHighlight(active, biggie));
	});

	////// Light and Dark Mode Logic //////
	type Theme = 'System' | 'Dark' | 'Light';

	let theme = $state<Theme>('System'); // default
	let themeBtn: HTMLButtonElement;
	// let themeDisplay;
	// let themeDisplay = $derived(()=>{return 0;});
	onMount(() => {
		// $: themeDisplay = theme==="System" ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? "Dark" : "Light")
		//                                     : theme;
		// let themeDisplay = $derived(() => {
		// 	if (theme === 'System') {
		// 		// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// 		//     document.documentElement.classList.add("dark");
		// 		// }
		// 		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light';
		// 	}
		// 	return theme;
		// });
		let saved = localStorage.getItem('theme');
		if (saved === null) saved = 'System';
		if (saved && ['System', 'Dark', 'Light'].includes(saved as Theme)) {
			theme = saved as Theme;
			if (
				theme === 'Dark' ||
				(theme === 'System' && window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.classList.add('dark');
				themeBtn.innerHTML =
					'<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" viewBox="0 0 24 24" ><path d="M12 17.01c2.76 0 5.01-2.25 5.01-5.01S14.76 6.99 12 6.99 6.99 9.24 6.99 12s2.25 5.01 5.01 5.01M12 9c1.66 0 3.01 1.35 3.01 3.01s-1.35 3.01-3.01 3.01-3.01-1.35-3.01-3.01S10.34 9 12 9M13 19h-2v3h2v-3M13 2h-2v3h2V2M2 11h3v2H2zM19 11h3v2h-3zM4.22 18.36l.71.71.71.71 1.06-1.06 1.06-1.06-.71-.71-.71-.71-1.06 1.06zM19.78 5.64l-.71-.71-.71-.71-1.06 1.06-1.06 1.06.71.71.71.71 1.06-1.06zM7.76 6.34 6.7 5.28 5.64 4.22l-.71.71-.71.71L5.28 6.7l1.06 1.06.71-.71zM16.24 17.66l1.06 1.06 1.06 1.06.71-.71.71-.71-1.06-1.06-1.06-1.06-.71.71z"></path></svg>';
			}
		} else {
			themeBtn.innerHTML =
				'<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" viewBox="0 0 24 24" ><path d="m12.2,22c4.53,0,8.45-2.91,9.76-7.24.11-.35.01-.74-.25-1-.26-.26-.64-.36-1-.25-.78.23-1.58.35-2.38.35-4.52,0-8.2-3.68-8.2-8.2,0-.8.12-1.6.35-2.38.11-.35.01-.74-.25-1s-.64-.36-1-.25C4.91,3.35,2,7.28,2,11.8c0,5.62,4.57,10.2,10.2,10.2ZM8.18,4.65c-.03.34-.05.68-.05,1.02,0,5.62,4.57,10.2,10.2,10.2.34,0,.68-.02,1.02-.05-1.42,2.56-4.12,4.18-7.15,4.18-4.52,0-8.2-3.68-8.2-8.2,0-3.03,1.63-5.73,4.18-7.15Z"></path></svg>';
			localStorage.setItem('theme', theme);
		}
	});

	onMount(() => {
		let themeDisplay = $derived(() => {
			if (theme === 'System') {
				// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				//     document.documentElement.classList.add("dark");
				// }
				return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light';
			}
			return theme;
		});

		function toggleTheme() {
			const html = document.documentElement;

			if (themeDisplay() === 'Dark') {
				theme = 'Light';
				// html.classList.remove("dark");
			} else if (themeDisplay() === 'Light') {
				theme = 'Dark';
				// html.classList.add("dark");
			} else {
				theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Light' : 'Dark';
			}
			localStorage.setItem('theme', theme);
			html.classList.toggle('dark', themeDisplay() === 'Dark');
			if (themeDisplay() === 'Dark')
				themeBtn.innerHTML =
					'<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" viewBox="0 0 24 24" ><path d="M12 17.01c2.76 0 5.01-2.25 5.01-5.01S14.76 6.99 12 6.99 6.99 9.24 6.99 12s2.25 5.01 5.01 5.01M12 9c1.66 0 3.01 1.35 3.01 3.01s-1.35 3.01-3.01 3.01-3.01-1.35-3.01-3.01S10.34 9 12 9M13 19h-2v3h2v-3M13 2h-2v3h2V2M2 11h3v2H2zM19 11h3v2h-3zM4.22 18.36l.71.71.71.71 1.06-1.06 1.06-1.06-.71-.71-.71-.71-1.06 1.06zM19.78 5.64l-.71-.71-.71-.71-1.06 1.06-1.06 1.06.71.71.71.71 1.06-1.06zM7.76 6.34 6.7 5.28 5.64 4.22l-.71.71-.71.71L5.28 6.7l1.06 1.06.71-.71zM16.24 17.66l1.06 1.06 1.06 1.06.71-.71.71-.71-1.06-1.06-1.06-1.06-.71.71z"></path></svg>';
			else
				themeBtn.innerHTML =
					'<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" viewBox="0 0 24 24" ><path d="m12.2,22c4.53,0,8.45-2.91,9.76-7.24.11-.35.01-.74-.25-1-.26-.26-.64-.36-1-.25-.78.23-1.58.35-2.38.35-4.52,0-8.2-3.68-8.2-8.2,0-.8.12-1.6.35-2.38.11-.35.01-.74-.25-1s-.64-.36-1-.25C4.91,3.35,2,7.28,2,11.8c0,5.62,4.57,10.2,10.2,10.2ZM8.18,4.65c-.03.34-.05.68-.05,1.02,0,5.62,4.57,10.2,10.2,10.2.34,0,.68-.02,1.02-.05-1.42,2.56-4.12,4.18-7.15,4.18-4.52,0-8.2-3.68-8.2-8.2,0-3.03,1.63-5.73,4.18-7.15Z"></path></svg>';
		}

		themeBtn.onclick = toggleTheme;
	});

	// Listen to system changes
	onMount(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)');

		// Update themeDisplay when system preference changes
		function systemChange(e: MediaQueryListEvent) {
			if (theme === 'System' || !localStorage.getItem('theme')) {
				document.documentElement.classList.toggle(
					'dark',
					window.matchMedia('(prefers-color-scheme: dark)').matches
				);
				theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light';
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					themeBtn.innerHTML =
						'<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" viewBox="0 0 24 24" ><path d="M12 17.01c2.76 0 5.01-2.25 5.01-5.01S14.76 6.99 12 6.99 6.99 9.24 6.99 12s2.25 5.01 5.01 5.01M12 9c1.66 0 3.01 1.35 3.01 3.01s-1.35 3.01-3.01 3.01-3.01-1.35-3.01-3.01S10.34 9 12 9M13 19h-2v3h2v-3M13 2h-2v3h2V2M2 11h3v2H2zM19 11h3v2h-3zM4.22 18.36l.71.71.71.71 1.06-1.06 1.06-1.06-.71-.71-.71-.71-1.06 1.06zM19.78 5.64l-.71-.71-.71-.71-1.06 1.06-1.06 1.06.71.71.71.71 1.06-1.06zM7.76 6.34 6.7 5.28 5.64 4.22l-.71.71-.71.71L5.28 6.7l1.06 1.06.71-.71zM16.24 17.66l1.06 1.06 1.06 1.06.71-.71.71-.71-1.06-1.06-1.06-1.06-.71.71z"></path></svg>';
				} else {
					themeBtn.innerHTML =
						'<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" viewBox="0 0 24 24" ><path d="m12.2,22c4.53,0,8.45-2.91,9.76-7.24.11-.35.01-.74-.25-1-.26-.26-.64-.36-1-.25-.78.23-1.58.35-2.38.35-4.52,0-8.2-3.68-8.2-8.2,0-.8.12-1.6.35-2.38.11-.35.01-.74-.25-1s-.64-.36-1-.25C4.91,3.35,2,7.28,2,11.8c0,5.62,4.57,10.2,10.2,10.2ZM8.18,4.65c-.03.34-.05.68-.05,1.02,0,5.62,4.57,10.2,10.2,10.2.34,0,.68-.02,1.02-.05-1.42,2.56-4.12,4.18-7.15,4.18-4.52,0-8.2-3.68-8.2-8.2,0-3.03,1.63-5.73,4.18-7.15Z"></path></svg>';
				}
			}
		}

		mq.addEventListener('change', systemChange);
	});
</script>

<nav class="fixed z-50 flex w-screen flex-row content-center py-0">
	<div
		class="mx-auto my-8 flex flex-row content-center gap-4 rounded-full bg-black/5 p-2 dark:bg-white/10"
	>
		<button
			onclick={toggleHindi}
			class="rounded-full bg-black/10 px-3 py-1.5 transition duration-300 hover:scale-90 active:scale-75 dark:bg-white/7.5 dark:text-white"
		>
			{#if $isHindi}
				इताश झांजी
			{:else}
				etash jhanji
			{/if}
		</button>
		<div bind:this={biggie} class="relative flex flex-row content-center rounded-full">
			<!-- Floating highlight -->
			<div
				class="pointer-events-none absolute top-2 bottom-2 z-0 rounded-full bg-black dark:bg-white dark:text-black"
				style="
                    transform: translateX({highlightX.current}px);
                    top: 0px;
                    width: {highlightWidth.current}px;
                    height: {highlightHeight.current}px;
                "
			></div>
			{#each tabs as tab (tab.id)}
				<!--class:bg-black={page.url.pathname===tab.path} -->
				{#if page.url.pathname === tab.path}
					<button
						bind:this={active}
						id={tab.id}
						class="z-10 rounded-full px-3 py-1.5 text-white transition duration-300 hover:scale-110 active:scale-90 dark:text-black"
					>
						<a
							href={resolve(
								tab.path as
									| '/'
									| '/about'
									| '/projects'
									| '/design'
									| '/about/'
									| '/design/'
									| '/projects/'
							)}
							class="selected">{tab.id}</a
						>
					</button>
				{:else}
					<button
						id={tab.id}
						class="rounded-full px-3 py-1.5 transition duration-300 hover:scale-110 active:scale-90 dark:text-white"
						onclick={() => updateHighlight(active!, biggie)}
					>
						<a href={tab.path}>{tab.id}</a>
					</button>
				{/if}
			{/each}
		</div>
		<button
			bind:this={themeBtn}
			class="rounded-full bg-black/10 px-3 py-1.5 transition duration-300 hover:scale-90 active:scale-75 dark:bg-white/7.5 dark:text-white"
		>
			<!-- {#if themeDisplay()==="Dark"}
            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="currentColor" viewBox="0 0 24 24" >
                <path d="M12 17.01c2.76 0 5.01-2.25 5.01-5.01S14.76 6.99 12 6.99 6.99 9.24 6.99 12s2.25 5.01 5.01 5.01M12 9c1.66 0 3.01 1.35 3.01 3.01s-1.35 3.01-3.01 3.01-3.01-1.35-3.01-3.01S10.34 9 12 9M13 19h-2v3h2v-3M13 2h-2v3h2V2M2 11h3v2H2zM19 11h3v2h-3zM4.22 18.36l.71.71.71.71 1.06-1.06 1.06-1.06-.71-.71-.71-.71-1.06 1.06zM19.78 5.64l-.71-.71-.71-.71-1.06 1.06-1.06 1.06.71.71.71.71 1.06-1.06zM7.76 6.34 6.7 5.28 5.64 4.22l-.71.71-.71.71L5.28 6.7l1.06 1.06.71-.71zM16.24 17.66l1.06 1.06 1.06 1.06.71-.71.71-.71-1.06-1.06-1.06-1.06-.71.71z"></path>
                </svg>
            {:else} -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="m12.2,22c4.53,0,8.45-2.91,9.76-7.24.11-.35.01-.74-.25-1-.26-.26-.64-.36-1-.25-.78.23-1.58.35-2.38.35-4.52,0-8.2-3.68-8.2-8.2,0-.8.12-1.6.35-2.38.11-.35.01-.74-.25-1s-.64-.36-1-.25C4.91,3.35,2,7.28,2,11.8c0,5.62,4.57,10.2,10.2,10.2ZM8.18,4.65c-.03.34-.05.68-.05,1.02,0,5.62,4.57,10.2,10.2,10.2.34,0,.68-.02,1.02-.05-1.42,2.56-4.12,4.18-7.15,4.18-4.52,0-8.2-3.68-8.2-8.2,0-3.03,1.63-5.73,4.18-7.15Z"
				></path>
			</svg>
			<!-- {/if} -->
		</button>
	</div>
</nav>
