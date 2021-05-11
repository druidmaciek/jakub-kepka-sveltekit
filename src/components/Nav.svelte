
<script>
    let showMobileMenu = false;
    
    function handleClick() {
        showMobileMenu = !showMobileMenu
    }
</script>

<div id="nav" class="px-2 sm:px-0 flex justify-between items-center text-gray-50 uppercase">
    
    <span class="text-4xl font-black tracking-tight font-title">Jakub Kępka</span>

    <div class="flex justify-start items-center space-x-2 font-semibold">
        <a class="p-1 hidden sm:block" href="#about">About</a>
        <a class="p-1 hidden sm:block" href="#nav">Paintings</a>
        <a class="p-1 hidden sm:block" href="#photos">Photoshoots</a>
        <a class="p-1 hidden sm:block" href="#contact">Contact</a>

        <button on:click="{handleClick}" class="block sm:hidden p-1 bg-white hover:bg-gray-100 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-900 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
        </button>
    </div>

</div>

{#if showMobileMenu}
<div class="relative">
    <div class="text-gray-50 text-right absolute z-50 right-0 bg-black px-2 space-y-2 pb-2 shadow-lg">
        <div>
            <a class="p-1 hover:bg-gray-900" href="#about">About</a>
        </div>
        <div>
            <a class="p-1 " href="#nav">Paintings</a>
        </div>
        <div>
            <a class="p-1 " href="#photos">Photoshoots</a>
        </div>
        <div>
            <a class="p-1 " href="#contact">Contact</a>
        </div>
        
    </div>
</div>
{/if}