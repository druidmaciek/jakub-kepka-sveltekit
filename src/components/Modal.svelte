<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
    import { Remarkable } from 'remarkable';
    
	let md = new Remarkable({linkTarget: "_blank"});
	export let painting;

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('hidePainting', false);
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
                    <span x-show="eng" class="ml-2 font-semibold uppercase text-gray-50">Back</span>
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
                <img style="max-height: 500px;"
                     width="640" height="360"
                     class="w-full object-contain" src={painting.content.image.filename}
                     alt="">
                <div  class="text-gray-50 text-cente mt-6">
                    <h2 class="text-4xl  font-title font-black mb-2">{painting.content.Title_ENG}</h2>
                    <p>{@html md.render(painting.content.Description_ENG)}</p>
                </div>
            </div>
        </div>
    </div>
</div>










<div transition:fade on:click={closeModal}
	class="hidden z-50 flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-black "
>
	<div class="mt-16 max-w-4xl mx-auto">
        <div class="flex justify-between items-center text-gray-50">
            <button on:click={closeModal}>X</button>
            <button on:click={closeModal}>X</button>
        </div>
		<img
			
			width="640"
			height="360"
			class="w-full max-h-[600px] object-contain"
			src={painting.content.image.filename}
			alt={painting.content.image.alt}
		/>
        <div class="text-gray-50 mt-6">
            <h2 class="text-3xl font-bold mb-2">{painting.content.Title_ENG}</h2>
            <p x-html="md.render(painting.content.Description_ENG)">{painting.content.Description_ENG}</p>
        </div>
	</div>
</div>
