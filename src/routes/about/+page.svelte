<script lang="ts">
    import { isHindi } from '$lib/scripts/language';
</script>
<div class="z-10 rounded-2xl p-4 max-w-full">
        <div class="text-6xl xs:text-7xl">
            {#if $isHindi}
                इताश झांजी
            {:else}
                etash jhanji
            {/if}
        </div>
        <div class="xs:text-2xl mt-2">
            Hi I'm {#if $isHindi}इताश{:else}Etash{/if}. I'm an undergradate studying computer science at Carnegie Mellon University. 
        </div>
        <br>
        
        <div>
            <div class="flex flex-col md:flex-row gap-4 flex-wrap min-w-50">
                <p class="text-sm xs:text-base max-w-fit md:max-w-3/8 my-2">I'm particularly interested in (but not limited to) AI, HCI, and signal processing research. In the past I have worked in biology labs leveraging computer vision for microscopy analysis and completed several machine learning projects. My selected coursework includes 15-122 and 15-151. </p>
                <pre class="max-w-full md:max-w-4/8 bg-gray-200/50 text-sm dark:bg-gray-800/50 p-4 rounded-lg overflow-x-auto"><code><span class="text-blue-600 dark:text-blue-400">interests</span>  = [<span class="text-green-600 dark:text-green-400">"AI"</span>, <span class="text-green-600 dark:text-green-400">"HCI"</span>, <span class="text-green-600 dark:text-green-400">"signal processing"</span>, <span class="text-gray-400 dark:text-gray-500">None</span>, <span class="text-gray-400 dark:text-gray-500">None</span>] <br><span class="text-blue-600 dark:text-blue-400">experience</span> = [<span class="text-green-600 dark:text-green-400">"Hukriede Lab - computer vision"</span>, 
              <span class="text-green-600 dark:text-green-400">"signal processing"</span>,<span class="text-green-600 dark:text-green-400">"deep learning"</span>,]<br><span class="text-blue-600 dark:text-blue-400">selected_coursework</span> =  &lbrace; 
              <span class="text-green-600 dark:text-green-400">"15-122"</span> : <span class="text-green-600 dark:text-green-400">"Principles of Imperative Computation"</span>, <br>              <span class="text-green-600 dark:text-green-400">"15-151"</span> : <span class="text-green-600 dark:text-green-400">"Mathematical Foundations for Computer Science"</span>, <br>              <span class="text-green-600 dark:text-green-400">"21-241"</span> : <span class="text-green-600 dark:text-green-400">"Matrix Algebra", </span>
            &rbrace;</code></pre>
            </div>
        <br>
            <div class="flex flex-col md:flex-row gap-4 flex-wrap min-w-50">
                <p class="text-sm xs:text-base max-w-fit md:max-w-3/8 my-2">Currently I'm looking for research experience for fall and spring semester, as well as possible summer positions in industry. I'm most familiar with Python, PyTorch, OpenCV, and Java, but I have a moderate experience in C and Rust. On the other end of the stack I have extensive experiencein frontend with HTML/CSS/JS, React, TailwindCSS, and </p>
                <pre class="max-w-full md:max-w-4/8 bg-gray-200/50 text-sm dark:bg-gray-800/50 p-4 rounded-lg overflow-x-auto"><code><span class="text-blue-600 dark:text-blue-400">searching</span> = &lbrace; 
                <span class="text-green-600 dark:text-green-400">"research"</span>    : [<span class="text-green-600 dark:text-green-400">"fall"</span>, <span class="text-green-600 dark:text-green-400">"summer"</span>, <span class="text-green-600 dark:text-green-400">"spring"</span>], 
              <span class="text-green-600 dark:text-green-400">  "internships"</span> : [<span class="text-green-600 dark:text-green-400">"summer"</span>], 
        &rbrace; <br><span class="text-blue-600 dark:text-blue-400">languages</span> = [<span class="text-green-600 dark:text-green-400">"Python"</span>, <span class="text-green-600 dark:text-green-400">"Java"</span>, <span class="text-green-600 dark:text-green-400">"HTML/CSS/JS"</span>, <span class="text-green-600 dark:text-green-400">"Typescript"</span>, <span class="text-green-600 dark:text-green-400">"Rust"</span>, <span class="text-green-600 dark:text-green-400">"C"</span>]<br><span class="text-blue-600 dark:text-blue-400">frameworks_packages</span> =  &lbrace; <span class="text-green-600 dark:text-green-400">
            "python"</span> : [<span class="text-green-600 dark:text-green-400">"numpy"</span>, <span class="text-green-600 dark:text-green-400">"pytorch"</span>, <span class="text-green-600 dark:text-green-400">"pandas"</span>, <span class="text-green-600 dark:text-green-400">"opencv"</span>], <br>            <span class="text-green-600 dark:text-green-400">"frontend"</span> : [<span class="text-green-600 dark:text-green-400">"React"</span>, <span class="text-green-600 dark:text-green-400">"SvelteKit"</span>, <span class="text-green-600 dark:text-green-400">"TailwindCSS"</span>, <span class="text-green-600 dark:text-green-400">"HeadlessUI"</span>],
        &rbrace;</code></pre>
            </div>
        <br>
            <div class="flex flex-col md:flex-row gap-4 flex-wrap min-w-50">
                <p class="text-sm xs:text-base max-w-fit md:max-w-3/8 my-2">Some of my hobbies include stationery, tetris (I'm not very good, though), and manga. </p>
                <pre class="max-w-full md:max-w-4/8 bg-gray-200/50 text-sm dark:bg-gray-800/50 p-4 rounded-lg overflow-x-auto"><code><span class="text-blue-600 dark:text-blue-400">hobbies</span>  = [<span class="text-green-600 dark:text-green-400">"stationery"</span>, <span class="text-green-600 dark:text-green-400">"manga"</span>, <span class="text-green-600 dark:text-green-400">"anime"</span>, <span class="text-green-600 dark:text-green-400">"tetris"</span>]<br><span class="text-blue-600 dark:text-blue-400">anime_manga</span>  = [<span class="text-green-600 dark:text-green-400">"Chainsaw Man"</span>, <span class="text-green-600 dark:text-green-400">"Evangelion"</span>, <span class="text-green-600 dark:text-green-400">"Yotsuba&!"</span>, 
                <span class="text-green-600 dark:text-green-400">"Monster"</span>, <span class="text-green-600 dark:text-green-400">"ReLIFE"</span>, <span class="text-green-600 dark:text-green-400">"Look Back"</span>, 
                <span class="text-green-600 dark:text-green-400">"Hope You're Happy Lemon"</span>]</code></pre>
            </div>
        </div>
        <br>
        <br>
    
        <a href="/ejhanji_resume.pdf" target="_blank" rel="external" class="mb-2 group block w-fit"><div class="flex flex-row gap-1 w-fit text-center dark:text-white text-black bg-black/5 dark:bg-white/15 bg-black-5 px-3 py-1 rounded-full transition duration-300 group-hover:scale-105 group-active:scale-90">
            resume  <div class="group-hover:translate-x-0.5 transition duration-150">→</div>
        </div></a>
        <a href="/about" target="_blank" class="group block w-fit mb-2"><div class="w-fit max-w-fit flex flex-row gap-1 text-center dark:text-white text-black bg-black/5 dark:bg-white/15 bg-black-5 px-3 py-1 rounded-full transition duration-300 group-hover:scale-105 group-active:scale-90">
             <div class="group-hover:-translate-x-0.5 transition duration-150">←</div> back home
        </div></a>

    </div>