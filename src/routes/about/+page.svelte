<script lang="ts">
	import { isHindi } from '$lib/scripts/language';
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { resolve } from '$app/paths';

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
</script>

<div class="z-10 max-w-full rounded-2xl p-4">
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
	<div class="mt-2 xs:text-2xl">
		Hi I'm {#if $isHindi}इताश{:else}Etash{/if}. I'm an undergradate studying computer science at
		Carnegie Mellon University.
	</div>
	<br />

	<div>
		<div class="flex min-w-50 flex-col flex-wrap gap-4 md:flex-row">
			<p class="my-2 max-w-fit text-sm xs:text-base md:max-w-3/8">
				I am concetrating in Computer Systems and enjoy taking hard courses in the field. <br /><br />I'm a
				<strong>teaching assistant</strong> for <a
					target="_blank"
					class="underline decoration-dashed"
					href="https://www.cs.cmu.edu/~15122/">15-122</a
				>
				(Principles of Imperative Computation), CMUs rigourous introductory programming class which teaches
				programming in C, data structures, contract-based programming, proofs, and memory safety.<br
				/><br />
				To keep me busy, I am the <strong>tech lead</strong> of <a
					target="_blank"
					class="underline decoration-dashed"
					href="https://courses.scottylabs.org/">CMU Courses</a
				> at <a
					target="_blank"
					class="underline decoration-dashed"
					href="https://scottylabs.org/">ScottyLabs</a
				>. Me and my team develop new features and maintain the existing
				codebase which serves CMU students during scheduling. If you're a CMU student, be sure to click that link and check it out for next
				semester ;)
				<br /><br />
				I am currently working with Prof. <a
					target="_blank"
					class="underline decoration-dashed"
					href="https://www.cs.cmu.edu/~jssunshi/">Joshua Sunshine</a
				> in his lab on <strong>specification refinement</strong> tools for critical
			    code to be agentically developed. In the past I have worked with biology labs, leveraging
				computer vision for microscopy analysis. <br /><br />My selected coursework includes Database Systems [15-445], Intro to Computer Systems [15-213], Great Theoretical Ideas in CS [15-251]
				Imperative Computation [15-122], Functional Programming [15-150], and Probability and Computing [15-151].
			</p>
			<pre
				class="max-w-full self-start overflow-x-auto rounded-lg p-4 text-sm md:max-w-4/8 dark:bg-gray-800/50"><code
					><span class="text-blue-600 dark:text-blue-400">major</span>           = <span
						class="text-green-600 dark:text-green-400">"Computer Science"</span
					><br /><span class="text-blue-600 dark:text-blue-400">concentration</span>   = <span
						class="text-green-600 dark:text-green-400">"Computer Systems"</span
					> <br /><span class="text-blue-600 dark:text-blue-400">interests</span>       = [<span
						class="text-green-600 dark:text-green-400">"System Design"</span
					>, <span class="text-green-600 dark:text-green-400">"Optimization"</span>, <span
						class="text-green-600 dark:text-green-400">"Databases"</span
					>, <span class="text-gray-400 dark:text-gray-500">"User Experiences"</span>, <span
						class="text-gray-400 dark:text-gray-500">None</span
					>] <br /><span class="text-blue-600 dark:text-blue-400">experience</span>      = [<span
						class="text-green-600 dark:text-green-400">"ScottyLabs - CMU Courses Tech Lead"</span
					>,
                   <span class="text-green-600 dark:text-green-400">"Google x CMU - AlloyDB Optimization Team"</span>,
                  <span
						class="text-green-600 dark:text-green-400"> "Sunshine Lab - Specification Refinement and Testing"</span
					>,]<br /><span class="text-blue-600 dark:text-blue-400">teaching_assistant</span
					>  =  &lbrace;
              <span class="text-green-600 dark:text-green-400">"15-122"</span> : [<span
						class="text-green-600 dark:text-green-400">"S26"</span
					>, <span class="text-green-600 dark:text-green-400">"N26"</span>, <span
						class="text-green-600 dark:text-green-400">"F26"</span
					>, ],
            &rbrace;<br /><span class="text-blue-600 dark:text-blue-400">selected_coursework</span
					> =  &lbrace;<br />              <span class="text-green-600 dark:text-green-400"
						>"15-445"</span
					> : <span class="text-green-600 dark:text-green-400"
						>"Database Systems"</span
					>, <br />              <span class="text-green-600 dark:text-green-400">"15-213"</span
					> : <span class="text-green-600 dark:text-green-400"
						>"Introduction to Computer Systems"</span
					>, <br />              <span class="text-green-600 dark:text-green-400">"15-251"</span
					> : <span class="text-green-600 dark:text-green-400">"Great Theoretical Ideas in Computer Science"</span>, <br
					/>              <span class="text-green-600 dark:text-green-400">"15-122"</span> : <span
						class="text-green-600 dark:text-green-400"
						>"Principles of Imperative Computation"</span
					>, <br />              <span class="text-green-600 dark:text-green-400">"15-150"</span
					> : <span class="text-green-600 dark:text-green-400">"Principles of Functional Programming", </span><br
					/>              <span class="text-green-600 dark:text-green-400">"21-259"</span> : <span
						class="text-green-600 dark:text-green-400"
						>"Probability and Computing", </span><br />            &rbrace;</code
				></pre>
		</div>
		<br />
		<div class="flex min-w-50 flex-col flex-wrap gap-4 md:flex-row">
			<p class="my-2 max-w-fit text-sm xs:text-base md:max-w-3/8">
				Currently I'm seeking out <strong>internships</strong> in backend and systems roles for the upcoming summer. I'm familiar with your
				typical stack: C, C++, Rust, Python, etc., but have various amounts of experience with other languages and am quick
			 to pick up any tooling you throw at me.
			</p>
			<pre
				class="max-w-full self-start overflow-x-auto rounded-lg bg-gray-200/50 p-4 text-sm md:max-w-4/8 dark:bg-gray-800/50"><code
					><span class="text-blue-600 dark:text-blue-400">searching</span> = &lbrace;<span class="text-green-600 dark:text-green-400"> "internships"</span> : [<span
						class="text-green-600 dark:text-green-400">"summer '27"</span>], &rbrace; <br /><span class="text-blue-600 dark:text-blue-400">languages</span> = [<span
						class="text-green-600 dark:text-green-400">"C"</span
					>, <span class="text-green-600 dark:text-green-400">"C++"</span>, <span
						class="text-green-600 dark:text-green-400">"Rust"</span
					>, <span class="text-green-600 dark:text-green-400">"Typescript"</span>, <span
						class="text-green-600 dark:text-green-400">"Go"</span
					>, <span class="text-green-600 dark:text-green-400">"Python"</span>, <br>             <span
						class="text-green-600 dark:text-green-400">"SQL"</span
					>, <span
						class="text-green-600 dark:text-green-400">"SML"</span
					>,]<br /><span class="text-blue-600 dark:text-blue-400">technologies</span
					> = [<span class="text-green-600 dark:text-green-400">"Linux/Unix"</span>, <span
						class="text-green-600 dark:text-green-400">"Dcoker"</span
					>, <span class="text-green-600 dark:text-green-400">"Nix"</span>, <span
						class="text-green-600 dark:text-green-400">"Git"</span>, <span
							class="text-green-600 dark:text-green-400">"Vim"</span>, <br>                <span
								class="text-green-600 dark:text-green-400">"PostgreSQL"</span>, <span
									class="text-green-600 dark:text-green-400">"DuckDB"</span>, <span
										class="text-green-600 dark:text-green-400">"PyTorch"</span>, <span
											class="text-green-600 dark:text-green-400">"SvelteKit"</span>, <br>                <span
												class="text-green-600 dark:text-green-400">"TailwindCSS"</span>, <span
													class="text-green-600 dark:text-green-400">"React"</span>, ]</code
				></pre>
		</div>
		<br />
		<div class="flex min-w-50 flex-col flex-wrap gap-4 md:flex-row">
			<p class="my-2 max-w-fit text-sm xs:text-base md:max-w-3/8">
				Some of my hobbies include iPods, retro gaming, stationery, tetris (I'm not very good, though), and manga.
			</p>
			<pre
				class="max-w-full self-start overflow-x-auto rounded-lg bg-gray-200/50 p-4 text-sm md:max-w-4/8 dark:bg-gray-800/50"><code
					><span class="text-blue-600 dark:text-blue-400">hobbies</span>      = [<span
						class="text-green-600 dark:text-green-400">"iPods"</span
					>, <span
						class="text-green-600 dark:text-green-400">"retro gaming"</span
					>, <span
						class="text-green-600 dark:text-green-400">"stationery"</span
					>, <br>                <span class="text-green-600 dark:text-green-400">"manga"</span>, <span
						class="text-green-600 dark:text-green-400">"anime"</span
					>, <span class="text-green-600 dark:text-green-400">"tetris"</span>]<br /><span
						class="text-blue-600 dark:text-blue-400">anime_manga</span
					>  = [<span class="text-green-600 dark:text-green-400">"Yotsuba&!"</span>, <span class="text-green-600 dark:text-green-400">"Full Metal Alchemist: Brotherhood"</span>, <br>                <span class="text-green-600 dark:text-green-400">"Chainsaw Man"</span>, <span
						class="text-green-600 dark:text-green-400">"Evangelion"</span
					>, <span class="text-green-600 dark:text-green-400">"Yotsuba&!"</span>,
                <span class="text-green-600 dark:text-green-400">"Monster"</span>, <span
						class="text-green-600 dark:text-green-400">"ReLIFE"</span
					>, <span class="text-green-600 dark:text-green-400">"Look Back"</span>, <span class="text-green-600 dark:text-green-400">"The Climber"</span>,
                <span class="text-green-600 dark:text-green-400">"Hope You're Happy Lemon"</span
					>]</code
				></pre>
		</div>
	</div>
	<br />
	<br />
	<!-- eslint-disable-next-line -->
	<a href="/ejhanji_resume.pdf" target="_blank" rel="external" class="group mb-2 block w-fit"
		><div
			class="bg-black-5 flex w-fit flex-row gap-1 rounded-lg bg-black/5 px-3 py-1 text-center text-black transition duration-300 group-hover:scale-105 group-active:scale-90 dark:bg-white/15 dark:text-white"
		>
			resume <div class="transition duration-150 group-hover:translate-x-0.5">→</div>
		</div></a
	>
	<div class="flex flex-row gap-2">
		<a href={resolve('/projects')} class="group mb-2 block w-fit"
			><div
				class="bg-black-5 flex w-fit flex-row gap-1 rounded-lg bg-black/5 px-3 py-1 text-center text-black transition duration-300 group-hover:scale-105 group-active:scale-90 dark:bg-white/15 dark:text-white"
			>
				projects <div class="transition duration-150 group-hover:translate-x-0.5">→</div>
			</div></a
		>
		<a href={resolve('/design')} class="group mb-2 block w-fit"
			><div
				class="bg-black-5 flex w-fit flex-row gap-1 rounded-lg bg-black/5 px-3 py-1 text-center text-black transition duration-300 group-hover:scale-105 group-active:scale-90 dark:bg-white/15 dark:text-white"
			>
				design <div class="transition duration-150 group-hover:translate-x-0.5">→</div>
			</div></a
		>
		<a href={resolve('/blog')} class="group mb-2 block w-fit"
			><div
				class="bg-black-5 flex w-fit flex-row gap-1 rounded-lg bg-black/5 px-3 py-1 text-center text-black transition duration-300 group-hover:scale-105 group-active:scale-90 dark:bg-white/15 dark:text-white"
			>
				blog <div class="transition duration-150 group-hover:translate-x-0.5">→</div>
			</div></a
		>
	</div>
	<a href={resolve('/')} class="group mb-2 block w-fit"
		><div
			class="bg-black-5 flex w-fit max-w-fit flex-row gap-1 rounded-lg bg-black/5 px-3 py-1 text-center text-black transition duration-300 group-hover:scale-105 group-active:scale-90 dark:bg-white/15 dark:text-white"
		>
			<div class="transition duration-150 group-hover:-translate-x-0.5">←</div>
			back home
		</div></a
	>
</div>
