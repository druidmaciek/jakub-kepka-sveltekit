<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	import client, { defaultRequestConfig as reqConfig } from '../storyblokClient';

	export async function load({ page, fetch, session, context }) {
		//const url = 'http://api.plos.org/search?q=ht';//`/articles/${page.params.slug}.json`;
		//const res = await fetch(url);

		
		const res = await client.get('cdn/stories/?starts_with=paintings/');
		const res2 = await client.get('cdn/stories/?starts_with=sesje/');
		const res3 = await client.get('cdn/stories/bio');
		//console.log(res.data.story);

		if (res.data.stories && res.data.stories) {
			//console.log(res.data.stories[0]['content']['image']);
			return {
				props: {
					paintings: await res.data.stories,
					photoshoots: await res2.data.stories,
					about: await res3.data.story,
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import Hero from '../components/Hero.svelte';
	import Nav from '../components/Nav.svelte';
	import Grid from '../components/Grid.svelte';
	import About from '../components/About.svelte';
	import List from '../components/List.svelte';
	import Contact from '../components/Contact.svelte';

	export let paintings;
	export let photoshoots;
	export let isPL = false;
	export let about;

	import { dictionary, locale } from 'svelte-i18n';
	dictionary.set({
		en: {
			hero: {
				button: 'Skip'
			},
			nav: {
				about: 'About',
				paintings: 'Paintings',
				photoshoots: 'Photoshoots',
				contact: 'Contact'
			},
			modal: {
				'back': 'Back'
			},
			photoshoots: {
				button: 'See Photoshoot'
			},
			footer: {
				by: 'Made by'
			}
		},
		pl: {
			hero: {
				button: 'Pomiń'
			},
			nav: {
				about: 'O Mnie',
				paintings: 'Obrazy',
				photoshoots: 'Sesje',
				contact: 'Kontakt'
			},
			modal: {
				'back': 'Powrót'
			},
			photoshoots: {
				button: 'Zobacz Sesje'
			},
			footer: {
				by: 'Wykonanie'
			}
		}
	});
    locale.set('en');
	

	import { onMount } from 'svelte';

	onMount(async () => {
		if (!(localStorage.getItem('lang_pl') === null)) {
			isPL = await (window.localStorage.getItem('lang_pl')) === 'true';
      if (isPL) {
        locale.set('pl');
      } else {
        locale.set('en');
      }
		}
	});

	
	function switchLang(event) {
		isPL = event.detail
	}
	

</script>

<!-- <Hero /> -->

<div class="flex justify-center items-center min-h-screen">

	<div class="flex flex-col md:flex-row justify-center items-center bg-black border-4 border-[#FF0000] p-4 text-center max-w-xl text-white">
        <div class="w-full md:w-1/2 mb-4 md:mb-0">
            <img src="poster.JPG" alt="Event Image" class="w-full h-auto border-b-4 border-black mb-4 md:mb-0">
        </div>
        <div class="w-full md:w-1/2 flex flex-col justify-center items-center">
            <h2 class="text-2xl font-bold mb-2">ABGRUND POKAZ 17.07 21:00</h2>
            <p class="text-lg mb-4">Na żywo będzie grał Lung artysta z Londynu, który zrobi performance muzyczno-artystyczny w tle do przejścia modeli</p>
            <div class="w-full flex justify-center">
                <a href="https://buy.stripe.com/14k7sT1uH4IIcIEdQQ" class="block bg-black text-white font-bold py-2 px-4 border-4 border-black hover:bg-red-600">
                    Kup Wejściówke
				</a>
            </div>
        </div>
    </div>
</div>




<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
	<Nav on:changeLang={switchLang} {isPL} />

	<Grid {isPL} {paintings} />

	<About  {about} {isPL} />

	<List {isPL} {photoshoots} />

	<Contact />
</div>
