<script>
	export let isPL;
	export let about;

	
	

</script>

<div id="about" class="mt-24 mb-24 text-gray-50 max-w-2xl mx-auto">
	
	<div class="">
		<h1 class="uppercase text-3xl font-black tracking-tight">Jakub Kępka</h1>
		<div class="mt-4 prose">
			{#if isPL}
			{@html about.content.body_pl}
			{:else}
			{@html about.content.body_eng}
			{/if}
		</div>
	</div>
</div>
