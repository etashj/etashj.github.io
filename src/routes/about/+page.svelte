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
				My minors include <strong>Machine Learning</strong> and <strong>Systems</strong>, but I'm
				also interested in HCI, LLMs, and signal processing research. <br /><br />I'm a
				<strong>teaching assistant for 15-122</strong>
				(Principles of Imperative Computation), CMUs most rigourous introductory programming class which
				teaches programming in C, data structures, contract based programming, proofs, and memory safety.<br
				/><br />
				In the past I have worked in biology labs leveraging
				<strong>computer vision</strong> for microscopy analysis and completed several machine learning
				projects. My selected coursework includes 15-122 and 15-151.
			</p>
			<pre
				class="max-w-full overflow-x-auto rounded-lg bg-gray-200/50 p-4 text-sm md:max-w-4/8 dark:bg-gray-800/50"><code
					><span class="text-blue-600 dark:text-blue-400">major</span>           = <span
						class="text-green-600 dark:text-green-400">"Computer Science"</span
					><br /><span class="text-blue-600 dark:text-blue-400">concentrations</span>  = [<span
						class="text-green-600 dark:text-green-400">"Machine Learning"</span
					>, <span class="text-green-600 dark:text-green-400">"Systems"</span>, ] <br /><span
						class="text-blue-600 dark:text-blue-400">interests</span
					>       = [<span class="text-green-600 dark:text-green-400">"AI"</span>, <span
						class="text-green-600 dark:text-green-400">"HCI"</span
					>, <span class="text-green-600 dark:text-green-400">"signal processing"</span>, <span
						class="text-gray-400 dark:text-gray-500">None</span
					>, <span class="text-gray-400 dark:text-gray-500">None</span>] <br /><span
						class="text-blue-600 dark:text-blue-400">experience</span
					>      = [<span class="text-green-600 dark:text-green-400"
						>"Hukriede Lab - computer vision"</span
					>,
                  <span class="text-green-600 dark:text-green-400">"signal processing"</span>,<span
						class="text-green-600 dark:text-green-400">"deep learning"</span
					>,]<br /><span class="text-blue-600 dark:text-blue-400">teaching_assistant</span
					>  =  &lbrace;
              <span class="text-green-600 dark:text-green-400">"15-122"</span> : [<span
						class="text-green-600 dark:text-green-400">"S26"</span
					>, ],
            &rbrace;<br /><span class="text-blue-600 dark:text-blue-400">selected_coursework</span
					> =  &lbrace;<br />              <span class="text-green-600 dark:text-green-400"
						>"15-122"</span
					> : <span class="text-green-600 dark:text-green-400"
						>"Principles of Imperative Computation"</span
					>, <br />              <span class="text-green-600 dark:text-green-400">"15-151"</span
					> : <span class="text-green-600 dark:text-green-400"
						>"Mathematical Foundations for Computer Science"</span
					>, <br />              <span class="text-green-600 dark:text-green-400">"21-241"</span
					> : <span class="text-green-600 dark:text-green-400">"Matrix Algebra", </span><br
					/>            &rbrace;</code
				></pre>
		</div>
		<br />
		<div class="flex min-w-50 flex-col flex-wrap gap-4 md:flex-row">
			<p class="my-2 max-w-fit text-sm xs:text-base md:max-w-3/8">
				Currently I'm looking for research experience for the semester, as well as possible summer
				positions in industry. I'm most familiar with Python, PyTorch, OpenCV, C, and Java, but I
				have a moderate experience in C++ and Rust. On the other end of the stack I have extensive
				experience in frontend with HTML/CSS/JS, React, TailwindCSS, and Svelte.
			</p>
			<pre
				class="max-w-full overflow-x-auto rounded-lg bg-gray-200/50 p-4 text-sm md:max-w-4/8 dark:bg-gray-800/50"><code
					><span class="text-blue-600 dark:text-blue-400">searching</span> = &lbrace;
                <span class="text-green-600 dark:text-green-400">"research"</span>    : [<span
						class="text-green-600 dark:text-green-400">"fall"</span
					>, <span class="text-green-600 dark:text-green-400">"summer"</span>, <span
						class="text-green-600 dark:text-green-400">"spring"</span
					>],
              <span class="text-green-600 dark:text-green-400">  "internships"</span> : [<span
						class="text-green-600 dark:text-green-400">"summer"</span
					>],
        &rbrace; <br /><span class="text-blue-600 dark:text-blue-400">languages</span> = [<span
						class="text-green-600 dark:text-green-400">"Python"</span
					>, <span class="text-green-600 dark:text-green-400">"Java"</span>, <span
						class="text-green-600 dark:text-green-400">"HTML/CSS/JS"</span
					>, <span class="text-green-600 dark:text-green-400">"Typescript"</span>, <span
						class="text-green-600 dark:text-green-400">"Rust"</span
					>, <span class="text-green-600 dark:text-green-400">"C"</span>, <span
						class="text-green-600 dark:text-green-400">"R"</span
					>,]<br /><span class="text-blue-600 dark:text-blue-400">frameworks_packages</span
					> =  &lbrace; <span class="text-green-600 dark:text-green-400">
            "python"</span
					> : [<span class="text-green-600 dark:text-green-400">"numpy"</span>, <span
						class="text-green-600 dark:text-green-400">"pytorch"</span
					>, <span class="text-green-600 dark:text-green-400">"pandas"</span>, <span
						class="text-green-600 dark:text-green-400">"opencv"</span
					>], <br />            <span class="text-green-600 dark:text-green-400">"frontend"</span
					> : [<span class="text-green-600 dark:text-green-400">"React"</span>, <span
						class="text-green-600 dark:text-green-400">"SvelteKit"</span
					>, <span class="text-green-600 dark:text-green-400">"TailwindCSS"</span>, <span
						class="text-green-600 dark:text-green-400">"HeadlessUI"</span
					>],
        &rbrace;<br /><span class="text-blue-600 dark:text-blue-400">languages</span> = [<span
						class="text-green-600 dark:text-green-400">"Microsoft Office"</span
					>, <span class="text-green-600 dark:text-green-400">"Adobe Illustrator"</span>, <span
						class="text-green-600 dark:text-green-400">"Adobe Indesign"</span
					>, <span class="text-green-600 dark:text-green-400">"Neovim"</span>, ]</code
				></pre>
		</div>
		<br />
		<div class="flex min-w-50 flex-col flex-wrap gap-4 md:flex-row">
			<p class="my-2 max-w-fit text-sm xs:text-base md:max-w-3/8">
				Some of my hobbies include stationery, tetris (I'm not very good, though), and manga.
			</p>
			<pre
				class="max-w-full overflow-x-auto rounded-lg bg-gray-200/50 p-4 text-sm md:max-w-4/8 dark:bg-gray-800/50"><code
					><span class="text-blue-600 dark:text-blue-400">hobbies</span>      = [<span
						class="text-green-600 dark:text-green-400">"stationery"</span
					>, <span class="text-green-600 dark:text-green-400">"manga"</span>, <span
						class="text-green-600 dark:text-green-400">"anime"</span
					>, <span class="text-green-600 dark:text-green-400">"tetris"</span>]<br /><span
						class="text-blue-600 dark:text-blue-400">anime_manga</span
					>  = [<span class="text-green-600 dark:text-green-400">"Chainsaw Man"</span>, <span
						class="text-green-600 dark:text-green-400">"Evangelion"</span
					>, <span class="text-green-600 dark:text-green-400">"Yotsuba&!"</span>,
                <span class="text-green-600 dark:text-green-400">"Monster"</span>, <span
						class="text-green-600 dark:text-green-400">"ReLIFE"</span
					>, <span class="text-green-600 dark:text-green-400">"Look Back"</span>,
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
