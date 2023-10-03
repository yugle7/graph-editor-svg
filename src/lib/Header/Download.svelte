<script>
	import { nodes } from '$lib/store';
	import { image, download } from '$lib/image';

	const style =
		"<defs><style>text {font-family: Georgia, 'Times New Roman', Times, serif;font-style: italic;}</style></defs>";

	function getImage() {
		const data = $image.outerHTML;
		const i = data.indexOf('>') + 1;
		const text = data.substring(0, i) + style + data.substring(i);
		return new Blob([text], { type: 'text/plain' });
	}

	$: if ($image && $download) {
		downloadImage();
		$download = false;
	}

	function downloadImage() {
		const element = document.createElement('a');
		element.href = URL.createObjectURL(getImage());
		element.download = 'graph.svg';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
</script>

<button
	disabled={$nodes.length === 0}
	on:click={() => {
		$download = true;
	}}
>
	<img src="Outline/Interface/Arrow down.svg" alt="download" />
</button>
