<script>
	import Content from '$lib/Content/Canvas.svelte';
	import Header from '$lib/Header/Menu.svelte';
	import Footer from '$lib/Footer/Menu.svelte';
	import Image from '$lib/Content/Image.svelte';

	import { onMount } from 'svelte';
	import { ctx } from '$lib/name';
	import { download, upload } from '$lib/image';

	onMount(() => {
		const canvas = document.createElement('canvas');
		$ctx = canvas.getContext('2d');
		$ctx.font = '14px Georgia';
	});
</script>

<Header />
<Content />
<Footer />

{#if $download || $upload}
	<Image />
{/if}
