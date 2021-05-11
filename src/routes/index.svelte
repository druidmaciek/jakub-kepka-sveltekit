<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
    import client, { defaultRequestConfig as reqConfig } from '../storyblokClient'
 
	export async function load({ page, fetch, session, context }) {
		//const url = 'http://api.plos.org/search?q=ht';//`/articles/${page.params.slug}.json`;
		//const res = await fetch(url);
        
        const url = 'cdn/stories/?starts_with=paintings/&sort_by=first_published_at:asc';
        const res = await client.get(url)
        const res2 = await client.get('cdn/stories/?starts_with=sesje/&sort_by=first_published_at:asc')
        //console.log(res.data.story);

		if (res.data.stories && res.data.stories) {
            //console.log(res.data.stories[0]['content']['image']);
			return {
				props: {
					paintings: await res.data.stories,
                    photoshoots: await res2.data.stories
				}
			};
		}


        

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}

    
</script>

<script>
    import Hero from "../components/Hero.svelte";
    import Nav from "../components/Nav.svelte";
    import Grid from "../components/Grid.svelte";
    import About from "../components/About.svelte";
    import List from "../components/List.svelte";
    import Contact from "../components/Contact.svelte";

    export let paintings;
    export let photoshoots;
</script>



<Hero/>

<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <Nav/>
    <Grid {paintings}>
    </Grid>
    <About/>
    <List {photoshoots}/>
    <Contact/>
</div>


