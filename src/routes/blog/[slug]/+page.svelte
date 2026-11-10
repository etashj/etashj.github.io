<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';

	let { data }: { data: PageData } = $props();
	const Content = data.content;

	const share = async () => {
		const shareData = {
			title: data.meta.title,
			url: window.location.href
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(window.location.href);
				alert('Link copied to clipboard!');
			}
		} catch (err) {
			console.error('Error sharing:', err);
		}
	};
</script>

<svelte:head>
	<title>{data.meta.title} — etash jhanji</title>
	{#if data.meta.description}
		<meta name="description" content={data.meta.description} />
	{/if}
</svelte:head>

<article class="mx-auto w-full max-w-4xl py-6">
	<header class="border-b border-black/15 pb-8 dark:border-white/20">
		<time datetime={data.meta.date} class="font-mono text-xs opacity-50">{data.meta.date}</time>
		<h1 class="mt-2 max-w-3xl text-4xl leading-tight font-semibold xs:text-5xl">
			{data.meta.title}
		</h1>

		<div class="mt-6 flex flex-wrap gap-5 text-sm">
			<a href={resolve('/blog')} class="group underline decoration-dashed underline-offset-4">
				<span class="inline-block transition-transform group-hover:-translate-x-0.5">←</span> all posts
			</a>
			<a
				href="/raw-blog/{data.slug}.md"
				target="_blank"
				rel="external"
				class="group underline decoration-dashed underline-offset-4"
			>
				download <span class="inline-block transition-transform group-hover:translate-y-0.5">↓</span
				>
			</a>
			<button
				type="button"
				onclick={share}
				class="group underline decoration-dashed underline-offset-4"
			>
				share <span class="inline-block transition-transform group-hover:-translate-y-0.5">↑</span>
			</button>
		</div>
	</header>

	<div class="prose mt-10 max-w-none prose-slate lg:prose-lg dark:prose-invert">
		<Content />
	</div>

	<footer class="mt-12 border-t border-black/15 pt-6 dark:border-white/20">
		<a
			href={resolve('/blog')}
			class="group flex w-fit items-center gap-1 text-sm underline decoration-dashed underline-offset-4"
		>
			<span class="inline-block transition-transform group-hover:-translate-x-0.5">←</span> back to blog
		</a>
	</footer>
</article>
