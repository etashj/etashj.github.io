<script lang="ts">
	import AsciiModel from '$lib/components/AsciiModel.svelte';
	import { isHindi } from '$lib/scripts/language';
	import { onMount } from 'svelte';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { resolve, asset } from '$app/paths';

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'top'
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});

	let modelPath: string | null = null;
	import { page } from '$app/state';

	// if (model!==null && model.substring(model.length-4) === '.stl') {
	// 	modelPath = `/models/${model}`;
	// }

	onMount(async () => {
		// Access query parameters
		const model = page.url.searchParams.get('model');
		try {
			const response = await fetch('/models.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const models: string[] = await response.json();
			if (model !== null && models.includes(model + '.stl')) {
				modelPath = `/models/${model}.stl`;
			} else if (model !== null && models.includes(model)) {
				modelPath = `/models/${model}`;
			} else if (models.length > 0) {
				const randomModel = models[Math.floor(Math.random() * models.length)];
				modelPath = `/models/${randomModel}`;
			}
		} catch (error) {
			console.error('Failed to fetch or process models.json:', error);
			// As a fallback, you could load a default model here
			modelPath = '/models/mew.stl';
		}
	});
</script>

<svelte:head>
	<meta name="google-site-verification" content="PhIQylF6YaD0goGYqvCLkigoPWsCO0ZnwLNlGBa1PsI" />
</svelte:head>

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
			class=" z-110 rounded-lg bg-black text-white shadow dark:bg-white dark:text-black"
		>
			<div use:melt={$arrow}></div>
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
	<br />
	<p class="text-sm xs:text-base">
		+ <a target="_blank" class="underline decoration-dashed" href="mailto:etash@cmu.edu"
			>etash@cmu.edu</a
		>
	</p>
	<p class="text-sm xs:text-base">
		+ <a target="_blank" class="underline decoration-dashed" href="https://linkedin.com/in/etashj"
			>linkedin.com/etashj</a
		>
	</p>
	<p class="text-sm xs:text-base">
		+ <a target="_blank" class="underline decoration-dashed" href="https://github.com/etashj/"
			>github.com/etashj</a
		>
	</p>
	<p class="text-sm xs:text-base">
		+ <a target="_blank" class="underline decoration-dashed" href="https://instagram.com/etashj/"
			>instagram.com/etashj</a
		>
	</p>
	<br />

	<a href={resolve('/about')} class="group mb-2 block w-fit"
		><div
			class="bg-black-5 flex w-fit max-w-fit flex-row gap-1 rounded-lg bg-black/5 px-3 py-1 text-center text-black transition duration-300 group-hover:scale-105 group-active:scale-90 dark:bg-white/15 dark:text-white"
		>
			about <div class="transition duration-150 group-hover:translate-x-0.5">→</div>
		</div></a
	>
	<!-- eslint-disable-next-line -->
	<a href={asset('/ejhanji_resume.pdf')} target="_blank" rel="external" class="group block w-fit"
		><div
			class="bg-black-5 flex w-fit flex-row gap-1 rounded-lg bg-black/5 px-3 py-1 text-center text-black transition duration-300 group-hover:scale-105 group-active:scale-90 dark:bg-white/15 dark:text-white"
		>
			resume <div class="transition duration-150 group-hover:translate-x-0.5">→</div>
		</div></a
	>
</div>
{#if modelPath}
	<AsciiModel stlPath={modelPath} />
{:else}
	<!-- Optional: show a placeholder or nothing while loading -->
{/if}
