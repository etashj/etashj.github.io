<script lang="ts">
	import { resolve } from '$app/paths';

	// Receive the 'projects' array from the load function above
	let { data } = $props();
	const { projects } = data;
</script>

{#each [...projects].reverse() as project (project.title)}
	<div class="card">
		<h3>{project.title}</h3>

		{#if project.links.demo}
			<a href={project.links.demo} rel="external" class="btn-primary">Demo</a>
		{/if}
		{#if project.links.github}
			<a href={project.links.github} rel="external">Github</a>
		{/if}
		{#if project.links.arxiv}
			<a href={project.links.arxiv} rel="external">ArXiV</a>
		{/if}
	</div>
{/each}

<a href={resolve('/')}
	><div
		class="bg-black-5 my-2 w-fit rounded-full bg-black/5 px-3 py-1 text-center text-black transition duration-300 hover:scale-105 active:scale-90 dark:bg-white/15 dark:text-white"
	>
		← back home
	</div></a
>
