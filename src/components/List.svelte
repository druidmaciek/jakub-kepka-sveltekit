<script>
    export let photoshoots;
    import Photoshoot from "../components/Photoshoot.svelte";
</script>
<div id="photos" class="mt-48">

    {#each photoshoots as photoshoot, i}
        <Photoshoot {photoshoot} left={i % 2 == 0}/>
    {/each}

</div>