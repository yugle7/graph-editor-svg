<script>
	import { pb, profile } from '$lib/pocketbase';
	import Graph from './Graph.svelte';
	import { onMount } from 'svelte';

	let graphs = [];

	onMount(async () => {
		graphs = await pb.collection('graphs').getFullList({
			sort: 'created',
			filter: `author="${$profile.id}"`
		});
	});
</script>

<div>
	{#each graphs as graph (graph.id)}
		<Graph
			{graph}
			on:delete={async () => {
				await pb.collection('graphs').delete(graph.id);
				graphs = graphs.filter((g) => g.id !== graph.id);
			}}
		/>
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20px;
		width: 100%;
	}
</style>
