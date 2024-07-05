<script>
	import {
		_
	}
	from 'svelte-i18n';
	import { fade } from 'svelte/transition';
    function shuffle(array) {
    return array.sort(function(){ 
        return .5 - Math.random(); 
    });
    }
	let current = 0;
	let images = shuffle([
		'https://img2.storyblok.com/800x0/filters:format(png)/f/105186/1080x1080/cb06d0f19d/106818436_438138920476271_1604832123519850608_n.jpg',
		'https://img2.storyblok.com/f/105186/1080x1080/65ba114caa/106256589_145117863876877_2643895214070327709_n.jpg',
        'https://img2.storyblok.com/800x0/filters:quality(90),format(png)/f/105186/6000x4000/3023bef980/dscf0080.jpg',
        'https://img2.storyblok.com/800x0/filters:quality(90),format(png)/f/105186/5297x3889/6a7cc33d3b/dscf0190.jpg',
	]);

    

    

	const interval = setInterval(function () {
		if (current > images.length) {
			current = 0;
		} else {
			current += 1;
		}
	}, 3000);
</script>

<div id="hero" class="relative mb-24 text-gray-50 font-title max-h-screen">
	<!-- <div transition:fade class="h-screen relative" id="hero-image">
		{#each images as image, i}
			<img style="opacity:0"
				class="{current === i
					? '!opacity-25'
					: 'opacity-0'} opacity-0 absolute h-screen w-full object-cover object-top"
				src={image}
				alt=""
			/>
		{/each}
	</div> -->
	<div class="h-screen relative" id="hero-image">
			<img 
				class="opacity-100 absolute h-screen w-full object-scale-down"
				src="/poster.JPG"
				alt=""
			/>
	</div>
	<div class="hidden mt-[35%] sm:mt-[30%] lg:mt-[25%] absolute inset-0">
		<div class="flex justify-center">
			<div>
				<h1 class="uppercase cursor-default text-9xl font-black text-center tracking-tight">Jakub Kępka</h1>
				<div class="mt-4 text-center">
					<a href="#nav" class="group outline-none">
						<p class="uppercase font-semibold text-3xl group-hover:text-gray-200">{$_('hero.button')}</p>
						<div class="flex justify-center">
							<svg
								class="h-6 w-6 text-gray-50 group-hover:text-gray-200"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	img {
		/* transition: opacity 1s linear; */
		-webkit-transition: opacity 1s ease-in-out;
		-moz-transition: opacity 1s ease-in-out;
		-o-transition: opacity 1s ease-in-out;
		transition: opacity 1s ease-in-out;
	}
</style>
