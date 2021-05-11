import preprocess from "svelte-preprocess";
/** @type {import('@sveltejs/kit').Config} */
import vercel from '@sveltejs/adapter-vercel';
const config = {
	preprocess: [
		preprocess({
			postcss: true
		}),
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
	}
};

export default config;
