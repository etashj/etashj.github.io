<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
	const { posts } = data;

	const share = async () => {
		const shareData = {
			title: 'blog — etash jhanji',
			text: 'Writing by Etash Jhanji',
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
	<title>blog — etash jhanji</title>
	<meta
		name="description"
		content="Notes on computer science, projects, school, and whatever else is on Etash Jhanji's mind."
	/>
</svelte:head>

<section class="mx-auto w-full max-w-4xl">
	<header class="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
		<div class="max-w-2xl">
			<h1 class="text-5xl leading-none xs:text-6xl">blog</h1>
		</div>

		<div class="flex shrink-0 gap-4 text-sm">
			<button
				type="button"
				onclick={share}
				class="group underline decoration-dashed underline-offset-4"
			>
				share <span class="inline-block transition-transform group-hover:-translate-y-0.5">↑</span>
			</button>
			<a
				href="/rss.xml"
				target="_blank"
				rel="external"
				class="group underline decoration-dashed underline-offset-4"
			>
				rss <span
					class="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
					>↗</span
				>
			</a>
		</div>
	</header>

	<div class="border-b border-black/15 dark:border-white/20">
		{#each posts as post (post.title)}
			<article class="border-t border-black/15 py-6 dark:border-white/20">
				<div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
					<h2 class="text-xl leading-tight font-semibold">
						<a
							href={resolve('/blog/[slug]', { slug: post.slug })}
							class="decoration-dashed underline-offset-4 hover:underline"
						>
							{post.title}
						</a>
					</h2>
					<time datetime={post.date} class="shrink-0 font-mono text-xs opacity-45">{post.date}</time
					>
				</div>

				{#if post.description}
					<p class="mt-3 max-w-2xl text-sm leading-relaxed opacity-75 xs:text-base">
						{post.description}
					</p>
				{/if}

				<div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					{#if post.keywords?.length}
						<ul
							class="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs opacity-55"
							aria-label="Post topics"
						>
							{#each post.keywords as keyword (keyword)}
								<li>#{keyword.toLowerCase().replaceAll(' ', '-')}</li>
							{/each}
						</ul>
					{/if}

					<div class="flex shrink-0 gap-5 text-sm">
						<a
							href={resolve('/blog/[slug]', { slug: post.slug })}
							class="group underline decoration-dashed underline-offset-4"
						>
							read <span class="inline-block transition-transform group-hover:translate-x-0.5"
								>→</span
							>
						</a>
						<a
							href="/raw-blog/{post.slug}.md"
							target="_blank"
							rel="external"
							class="group underline decoration-dashed underline-offset-4"
						>
							download <span class="inline-block transition-transform group-hover:translate-y-0.5"
								>↓</span
							>
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>

	<a
		href={resolve('/')}
		class="group mt-10 flex w-fit items-center gap-1 text-sm underline decoration-dashed underline-offset-4"
	>
		<span class="inline-block transition-transform group-hover:-translate-x-0.5">←</span> back home
	</a>
</section>
