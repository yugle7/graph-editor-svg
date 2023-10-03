<script>
	export let key;
	export let value;

	import { copied } from '$lib/copy';

	function copy() {
		navigator.clipboard.writeText(value);
		$copied = value;
	}
</script>

<p>
	{key}: <code>{value}</code>
	<button on:click={copy}>
		<img src="Outline/Communication/{$copied === value ? 'Copied' : 'Copy'}.svg" alt="copy" />
	</button>
</p>

<style>
	p {
		padding: 0;
	}
	button {
		padding-left: 2px;
		opacity: 0.8;
	}
	button:hover {
		opacity: 0.5;
	}
	img {
		width: 16px;
	}
</style>
