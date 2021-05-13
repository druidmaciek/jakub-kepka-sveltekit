<script>
	import { Remarkable } from 'remarkable';
  import { createEventDispatcher } from 'svelte';
	let md = new Remarkable({linkTarget: "_blank"});
	export let photoshoot;
	export let left = true;

  const dispatch = createEventDispatcher();
    function handleClick() {
      console.log(photoshoot);
        dispatch('showPhotoshoot', photoshoot);
    }

</script>






<div class="sm:flex sm:items-start mt-24 sm:mt-48 px-4 sm:px-0">
  
  <div class="{ left ? 'order-1' : 'order-2'} w-full sm:w-3/5 pl-0 sm:px-12 text-gray-50 text-center sm:text-left">
    <h2 on:click={handleClick} class="mt-4 text-5xl smtext-3xl uppercase font-semibold font-title tracking-wider cursor-pointer">{photoshoot.content.name_eng}</h2>
      <div class="hidden sm:block mt-2 prose font-normal">{@html md.render(photoshoot.content.desc_eng)}</div>
      <button on:click={handleClick} class="mb-6 sm:mb-0 mt-6 text-xl font-semibold tracking-wider hover:underline">See Session
      </button>
  </div>
 

  <img width="640" height="360"
       on:click={handleClick}
       class="{ left ? 'order-2' : 'order-1'} cursor-pointer sm:pr-12 w-full sm:w-2/5 object-cover rounded-sm h-full"
       src="{photoshoot.content.gallery[0].filename.replace('//a.storyblok.com', '//img2.storyblok.com/0x950/filters:quality(90),format(png)')}" 
       alt="">

</div>


