<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
    import { Remarkable } from 'remarkable';
    
	let md = new Remarkable({linkTarget: "_blank"});
	export let photoshoot;

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('hidePhotoshoot', false);
	}


    export let gallery = photoshoot.content.gallery;
    let activeImage = 0;

    function previousImage() {
        if (activeImage == 0) { activeImage = gallery.length } else { activeImage -= 1; }
    }
    
    function nextImage() {
        if (activeImage == gallery.length) { activeImage = 0 } else { activeImage += 1; }
    }

</script>




<div transition:fade="{{duration: 250 }}" class="fixed z-50 inset-0 overflow-y-auto">
    <div
         class="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity">
            <div on:click={closeModal} class="absolute inset-0 bg-black"></div>


        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle"></span>&#8203;

        <div 
             class="inline-block align-bottom bg-black px-4 text-left overflow-hidden
          transform transition-all sm:mt-4 sm:align-middle sm:max-w-4xl sm:w-full sm:px-6" role="dialog"
             aria-modal="true" aria-labelledby="modal-headline">

            <!-- Close buttons -->
            <div class="flex justify-between items-center">
                <button  on:click={closeModal} class="inline-flex focus:outline-none">
                    <svg class="h-6 w-6 text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fill-rule="evenodd"
                              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                              clip-rule="evenodd"/>
                    </svg>
                    <span class="ml-2 font-semibold uppercase text-gray-50">Back</span>
                </button>
                <button  on:click={closeModal}  class="focus:outline-none">
                    <svg class="h-6 w-6 text-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <!-- Painting and Info -->
            <div class="mt-4">
                <div class="block overflow-x-auto flex items-center justify-between">
                    {#each gallery as image}
                    
                        <img style="max-height: 500px;"
                             width="640" height="360"
                         class="w-full object-contain"
                         src={image.filename.replace('//a.storyblok.com', '//img2.storyblok.com/500x0/filters:quality(90),format(png)')}
                         alt="">
                    
                    {/each}
                </div>
                <div class="hidden">
                    <button on:click={previousImage}
                            type="button">
                        <svg class="text-white hover:text-gray-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>
                    <img style="max-height: 500px;"
                         width="640" height="360"
                         class="w-full object-contain"
                         src="{gallery[activeImage].filename.replace('//a.storyblok.com', '//img2.storyblok.com/800x0/filters:quality(90),format(png)')}"
                         alt="">
                    <button on:click={nextImage}
                            type="button">
                        <svg class="text-white hover:text-gray-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </button>

                </div>
                <div class="text-white mt-6">
                    <h2 class="text-3xl font-bold mb-2">{ photoshoot.content.name_eng}</h2>
                    <div>{@html md.render(photoshoot.content.desc_eng)}</div>
                </div>
                
            </div>
        </div>
    </div>
</div>
