<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
	const { projects } = data;
</script>

<svelte:head>
	<title>projects — etash jhanji</title>
	<meta
		name="description"
		content="Selected software, hardware, research, and design projects by Etash Jhanji."
	/>
</svelte:head>

<section class="mx-auto w-full max-w-5xl px-2 xs:px-0">
	<header class="mb-10 max-w-2xl">
		<h1 class="text-5xl leading-none xs:text-6xl">projects</h1>
	</header>

	<div class="grid gap-x-10 min-[900px]:grid-cols-2">
		{#each [...projects].reverse() as project (project.title)}
			<article class="flex h-full flex-col border-t border-black/15 py-6 dark:border-white/20">
				<div class="flex items-start justify-between gap-4">
					<h2 class="text-xl leading-tight font-semibold">{project.title}</h2>
					<time class="shrink-0 font-mono text-xs opacity-45">{project.date}</time>
				</div>

				<p class="mt-3 text-sm leading-relaxed opacity-75 xs:text-base">{project.description}</p>

				<ul
					class="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs opacity-55"
					aria-label="Project tags"
				>
					{#each project.tags as tag (tag)}
						<li>#{tag.toLowerCase().replaceAll(' ', '-')}</li>
					{/each}
				</ul>

				<div class="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm">
					{#if project.links.demo}
						<a
							href={project.links.demo}
							rel="external"
							target="_blank"
							class="group underline decoration-dashed underline-offset-4"
						>
							demo <span
								class="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								>↗</span
							>
						</a>
					{/if}
					{#if project.links.github}
						<a
							href={project.links.github}
							rel="external"
							target="_blank"
							class="group underline decoration-dashed underline-offset-4"
						>
							github <span
								class="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								>↗</span
							>
						</a>
					{/if}
					{#if project.links.arxiv}
						<a
							href={project.links.arxiv}
							rel="external"
							target="_blank"
							class="group underline decoration-dashed underline-offset-4"
						>
							arxiv <span
								class="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								>↗</span
							>
						</a>
					{/if}
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
