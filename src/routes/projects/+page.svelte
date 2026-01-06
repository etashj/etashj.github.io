<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
	const { projects } = data;

	// Svelte Action for the Tilt and Shimmer effect
	function glassTilt(node: HTMLElement) {
		const handleMouseMove = (e: MouseEvent) => {
			const { left, top, width, height } = node.getBoundingClientRect();
			const x = (e.clientX - left) / width;
			const y = (e.clientY - top) / height;

			// Map coordinates to rotation (-10 to 10 degrees)
			const rotateX = (y - 0.5) * -20;
			const rotateY = (x - 0.5) * 20;

			node.style.setProperty('--x', `${x * 100}%`);
			node.style.setProperty('--y', `${y * 100}%`);
			node.style.setProperty('--rx', `${rotateX}deg`);
			node.style.setProperty('--ry', `${rotateY}deg`);
		};

		const handleMouseLeave = () => {
			node.style.setProperty('--rx', `0deg`);
			node.style.setProperty('--ry', `0deg`);
		};

		node.addEventListener('mousemove', handleMouseMove);
		node.addEventListener('mouseleave', handleMouseLeave);

		return {
			destroy() {
				node.removeEventListener('mousemove', handleMouseMove);
				node.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}
</script>

<div
	class="max-5 mb-10 flex w-full flex-row flex-wrap content-center items-center justify-center gap-10"
>
	{#each [...projects].reverse() as project (project.title)}
		<div
			use:glassTilt
			class="glass-card group relative flex h-fit w-fit max-w-sm shrink-0 grow flex-col
                   gap-1 overflow-hidden rounded-[2.5rem] border-indigo-500/30 border-white/50 bg-white/10 p-6 shadow-[20px_20px_40px_rgba(0,0,0,0.3),inset_0_0_15px_rgba(255,255,255,0.1),-2px_-2px_5px_rgba(255,0,255,0.1),2px_2px_5px_rgba(0,255,255,0.1)]
                   backdrop-blur-[4px]"
		>
			<div
				class="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,0,255,0.05)_45%,rgba(0,255,255,0.05)_55%,transparent_100%)] opacity-20 transition-opacity group-hover:opacity-40"
			></div>

			<div class="relative z-10 translate-z-10">
				<h3 class="text-xl font-bold text-gray-900 dark:text-white">
					{project.title}<span class="ml-2 text-sm font-normal opacity-40">{project.date}</span>
				</h3>
				<p class="my-2 text-gray-700 dark:text-gray-300">{project.description}</p>

				<div class="mt-4 flex w-full flex-row flex-wrap items-center justify-start gap-2">
					{#each project.tags as tag (tag)}
						<div
							class="rounded-lg border border-white/10 bg-black/5 px-2 py-1 text-xs font-medium backdrop-blur-md dark:bg-white/10"
						>
							{tag}
						</div>
					{/each}
				</div>

				<div class="mt-6 flex w-full flex-row justify-center gap-3">
					{#if project.links.demo}
						<a href={project.links.demo} rel="external" target="_blank" class="flex-1">
							<div
								class="rounded-xl border border-white/20 bg-gray-300/20 py-2 text-center text-sm font-bold transition hover:bg-gray-300/40 dark:text-white dark:hover:bg-white/40"
							>
								Demo
							</div>
						</a>
					{/if}
					{#if project.links.github}
						<a href={project.links.github} rel="external" target="_blank" class="flex-1">
							<div
								class="rounded-xl border border-white/20 bg-gray-300/20 py-2 text-center text-sm font-bold transition hover:bg-gray-300/40 dark:text-white dark:hover:bg-white/40"
							>
								GitHub
							</div>
						</a>
					{/if}
					{#if project.links.arxiv}
						<a href={project.links.arxiv} rel="external" target="_blank" class="flex-1">
							<div
								class="rounded-xl border border-white/20 bg-gray-300/20 py-2 text-center text-sm font-bold transition hover:bg-gray-300/40 dark:text-white dark:hover:bg-white/40"
							>
								ArXiV
							</div>
						</a>
					{/if}
				</div>
			</div>
		</div>
	{/each}
</div>

<a href={resolve('/')} class="group mb-2 block w-fit">
	<div
		class="flex w-fit max-w-fit flex-row gap-1 rounded-lg bg-black/5 px-3 py-1 text-center text-black transition duration-300 group-hover:scale-105 dark:bg-white/15 dark:text-white"
	>
		<div class="transition duration-150 group-hover:-translate-x-0.5">←</div>
		back home
	</div>
</a>

<style>
	.glass-card {
		transform: perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
		transition: transform 0.1s ease-out;
		transform-style: preserve-3d;
	}

	/* The Shimmer/Refraction Light Beam */
	.glass-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at var(--x, 50%) var(--y, 50%),
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 255, 255, 0) 50%
		);
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	.glass-card:hover::before {
		opacity: 1;
	}
</style>
