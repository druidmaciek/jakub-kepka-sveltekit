
<script>
    import { fly } from 'svelte/transition';
    import Painting from "../components/Painting.svelte";
    import Modal from "../components/Modal.svelte";
    
	export let paintings;
    export let preview = true;
    export let isPL;
    
    let selectedPainting;
    let showModal = false;


    function togglePaintings() {
        preview = !preview;
        
    }

    function showPaintingModal(event) {
        selectedPainting = event.detail;
        showModal = true;
    }

    function closePaintingModal(event) {
        console.log('yoh');
        selectedPainting = null;
        showModal = event.detail;
    }




</script>

{#if showModal}
<Modal on:hidePainting={closePaintingModal} painting={selectedPainting} {isPL}/>
{/if}
<div class="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
	{#each paintings as painting, i}
        
            {#if i < 6}
                <Painting on:showPainting={showPaintingModal} {painting} {isPL}/>
            
            {:else}
                {#if !preview}
                    
                    <Painting on:showPainting={showPaintingModal} {painting} {isPL}/>
                {/if}
            {/if}
	{/each}
</div>

<div>


<div class="mt-24 flex justify-center items-center">
    <button on:click={togglePaintings}
            class="cursor-pointer group focus:outline-none">
        <div class="uppercase tracking-wider font-semibold  text-xl text-gray-50 group-hover:text-gray-200">
            {#if preview}
                <span>Show All</span>
            {:else}
        
                <span>Hide</span>
            {/if}


        </div>
        <div class="flex justify-center">
            {#if preview}
            <svg class="h-6 w-6 text-gray-50 group-hover:text-gray-200"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"/>
            </svg>
            {:else}
            <svg class="h-6 w-6 text-gray-50 group-hover:text-gray-200"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clip-rule="evenodd"/>
            </svg>
            {/if}
        </div>
    </button>
</div>

</div>