<script>
    export let photoshoots;
    import Photoshoot from "../components/Photoshoot.svelte";
    import Modal from "../components/ModalSession.svelte";

    let selectedPhotoshoot;
    let showModal = false;

    function showPhotoshootModal(event) {
        console.log(event.detail)
        selectedPhotoshoot = event.detail;
        showModal = true;
    }

    function closePhotoshootModal(event) {
        selectedPhotoshoot = null;
        showModal = event.detail;
    }

</script>


{#if showModal}
<Modal on:hidePhotoshoot={closePhotoshootModal} photoshoot={selectedPhotoshoot}/>
{/if}

<div id="photos" class="mt-48">

    {#each photoshoots as photoshoot, i}
        <Photoshoot on:showPhotoshoot={showPhotoshootModal} {photoshoot} left={i % 2 == 0}/>
    {/each}

</div>