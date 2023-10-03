<script>
	import { pb, profile } from '$lib/pocketbase';
	import { edit } from '$lib/store';
	import Graphs from './Graphs.svelte';
</script>

<button
	style="left:0;"
	on:click={() => {
		$edit = true;
	}}
>
	<img src="Outline/Interface/Plus.svg" alt="edit" />
</button>

<button
	style="right:0;"
	on:click={async () => {
		$edit = true;
		pb.authStore.clear();
	}}
>
	<img src="Outline/Interface/Logout.svg" alt="logout" />
</button>

<p>
	{$profile.email}
	<a href="/about">О приложении</a>
</p>

<Graphs />

<style>
	p {
		display: flex;
		flex-direction: column;
		text-align: center;
		font-size: var(--font-0);
		color: var(--color-2);
		padding: 20px;
	}
	button {
		position: fixed;
		top: 0;
		padding: 10px;
	}
</style>
