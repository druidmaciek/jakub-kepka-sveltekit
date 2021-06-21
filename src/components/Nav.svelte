<script>
	import { _, locale } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';


	let showMobileMenu = false;

	function handleClick() {
		showMobileMenu = !showMobileMenu;
	}
	export let isPL;

	function langSwitch() {
		if (isPL) {
			locale.set('en');
			isPL = false;
            window.localStorage.setItem('lang_pl', 'false');
			dispatch('changeLang', false);
		} else {
			locale.set('pl');
			isPL = true;
            window.localStorage.setItem('lang_pl', 'true');
			dispatch('changeLang', true);
		}
	}
	const dispatch = createEventDispatcher();

</script>

<div id="nav" class="px-2 sm:px-0 flex justify-between items-center text-gray-50 uppercase">
	<span class="text-4xl cursor-default font-black tracking-tight font-title">Jakub Kępka</span>

	<div class="flex justify-start items-center space-x-2 font-semibold">
		<a class="p-1 hidden sm:block" href="#about">{$_('nav.about')}</a>
		<a class="p-1 hidden sm:block" href="#nav">{$_('nav.paintings')}</a>
		<a class="p-1 hidden sm:block" href="#photos">{$_('nav.photoshoots')}</a>
		<a class="p-1 hidden sm:block" href="#contact">{$_('nav.contact')}</a>

		<button
			on:click={langSwitch}
			class="cursor-pointer p-1 hidden sm:block group focus:outline-none focus:border-2 focus:rounded focus:border-whitu"
		>
			<span class="w-8 inline-block group-hover:hidden">
				{#if isPL}PL{:else}ENG{/if}</span
			>
			<span class="w-8 hidden group-hover:inline-block">
				{#if isPL}ENG{:else}PL{/if}
			</span>
		</button>

		<button on:click={handleClick} class="block sm:hidden p-1 bg-gray-50 hover:bg-gray-300 rounded">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="text-gray-900 h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</div>
</div>

{#if showMobileMenu}
	<div class="relative">
		<div
			class="text-gray-50 text-right absolute z-50 right-0 bg-black px-2 space-y-2 pb-2 shadow-lg"
		>
			<div>
				<a class="p-1 hover:bg-gray-900" href="#about">{$_('nav.about')}</a>
			</div>
			<div>
				<a class="p-1 " href="#nav">{$_('nav.paintings')}</a>
			</div>
			<div>
				<a class="p-1 " href="#photos">{$_('nav.photoshoots')}</a>
			</div>
			<div>
				<a class="p-1 " href="#contact">{$_('nav.contact')}</a>
			</div>
			<div>
				<button on:click={langSwitch} class="p-1 focus:outline-none">
					<span class="w-8 inline-block group-hover:hidden">
						{#if isPL}PL{:else}ENG{/if}</span
					>
					<span class="w-8 hidden group-hover:inline-block">
						{#if isPL}ENG{:else}PL{/if}
					</span>
				</button>
			</div>
		</div>
	</div>
{/if}
