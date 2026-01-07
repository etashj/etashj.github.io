<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	export let data: PageData;
</script>

<article class="mx-3 prose py-10 prose-slate lg:prose-xl dark:text-white dark:prose-invert">
	<header>
		<p class="text-sm text-slate-500 dark:text-white/50">{data.meta.date}</p>
		<h1 class="dark:text-white">{data.meta.title}</h1>
	</header>
	<div class="-mt-6 flex flex-row gap-x-2">
		<a href={resolve('/blog')}
			><div
				class="bg-black-5 my-2 w-fit rounded-lg bg-black/5 px-3 py-1 text-center text-black no-underline transition duration-300 hover:scale-105 active:scale-90 dark:bg-white/15 dark:text-white"
			>
				← back to blogs
			</div></a
		>
		<a href="/raw-blog/sample.md" target="_blank" rel="external"
			><div
				class="bg-black-5 my-2 w-fit rounded-lg bg-black/5 px-3 py-1 text-center text-black no-underline transition duration-300 hover:scale-105 active:scale-90 dark:bg-white/15 dark:text-white"
			>
				download ↓
			</div></a
		>
	</div>

	<svelte:component this={data.content} />
</article>
<a href={resolve('/blog')}
	><div
		class="bg-black-5 my-2 w-fit rounded-lg bg-black/5 px-3 py-1 text-center text-black transition duration-300 hover:scale-105 active:scale-90 dark:bg-white/15 dark:text-white"
	>
		← back to blogs
	</div></a
>
