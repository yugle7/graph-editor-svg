<script>
	import { pb } from '$lib/pocketbase';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let graph;

	const url = pb.files.getUrl(graph, graph.image);
</script>

<a href="/{graph.id}">
	<h2>{graph.title}</h2>
	<div class="outer">
		<div class="inner">
			<img class="image" src={url} alt={graph.title} />
		</div>
		<button on:click|stopPropagation|preventDefault={() => dispatch('delete')}>
			<img src="Outline/Interface/Cross.svg" alt="delete" />
		</button>
	</div>
</a>

<style>
	a {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img {
		max-width: calc(100vw - 20px);
	}
	.outer {
		width: 100vw;
		position: relative;
	}

	.inner {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		position: absolute;
		padding: 5px;
		top: 0;
		right: 0;
		opacity: 0.5;
	}
	button:hover {
		opacity: 1;
	}
</style>
