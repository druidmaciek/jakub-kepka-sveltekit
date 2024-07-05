<script>
    import {
		_
	}
	from 'svelte-i18n';
    let year = new Date().getFullYear();
</script>
<div id="nav" class="mt-24 p-1 sm:py-2 sm:px-4 flex justify-between items-center text-gray-50 uppercase text-xs  sm:text-base">
    
    <a href="#hero">© {year} Jakub Kępka</a>

    <div class="hidden sm:block flex justify-start space-x-8 font-semibold">
        <a href="#about">{$_('nav.about')}</a>
        <a href="#photos">{$_('nav.photoshoots')}</a>
        <a href="#nav">{$_('nav.paintings')}</a>
    </div>

    <div>
        <a href="https://bitgeese.io">{$_('footer.by')}: BitGeese.io</a>
    </div>

</div>