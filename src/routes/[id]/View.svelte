<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { pb, profile } from '$lib/pocketbase';
	import { edit, login, reset } from '$lib/store';
	import { upload } from '$lib/image';
	import { goto } from '$app/navigation';

	$upload = false;
	reset();

	let graph;
	let url;

	onMount(async () => {
		graph = await pb.collection('graphs').getOne($page.params.id);
		url = pb.files.getUrl(graph, graph.image);
	});
</script>

<menu>
	{#if $profile}
		<button
			on:click={async () => {
				if (graph) {
					await pb.collection('graphs').update(graph.id, {
						title: graph.title
					});
				}
				goto('/');
			}}
		>
			<img src="Outline/Communication/Save.svg" alt="save" />
		</button>
		<a href="/">
			<img src="Outline/Communication/User.svg" alt="profile" />
		</a>
	{:else}
		<button
			on:click|preventDefault={() => {
				$login = true;
			}}
		>
			<img src="Outline/Interface/Login.svg" alt="login" />
		</button>
	{/if}
</menu>

<div>
	{#if graph}
		{#if $profile.id === graph.author}
			<input type="text" bind:value={graph.title} placeholder="Заголовок" />
			<button
				on:click|preventDefault={() => {
					$edit = true;
				}}
			>
				<img src={url} alt="graph" />
			</button>
		{:else}
			<h2>{graph.title}</h2>
			<img src={url} alt="graph" />
		{/if}
	{/if}
</div>

<style>
	menu {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 10px;
		margin: 0;
	}
	input {
		align-items: center;
		text-align: center;
		width: auto;
	}
	img {
		max-width: calc(100vw - 20px);
	}
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: auto;
	}
</style>
