<script>
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    export let painting;
    export let isPL;

    const dispatch = createEventDispatcher();
    function handleClick() {
        dispatch('showPainting', painting);
    }
</script>


<div on:click={handleClick}
    transition:fly="{{ y: 200, duration: 1000 }}" 
     class="group aspect-w-10 aspect-h-12 cursor-pointer">
    <img  class="rounded-sm border border-gray-900 object-cover object-top sm:object-center lg:h-full lg:w-full group-hover:opacity-25" 
    src={painting.content.image.filename.replace('//a.storyblok.com', '//img2.storyblok.com/500x0/filters:format(png)') }
    alt={painting.content.image.alt}>
    
    <div class="px-4 pt-8 font-semibold opacity-0 group-hover:opacity-100" >
        <p class="text-gray-50 font-title text-3xl">{#if isPL }{painting.content.Title_PL}{:else}{ painting.content.Title_ENG }{/if}</p>
        
    </div>
</div>