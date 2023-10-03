<script>
	import Back from './Back.svelte';
	import Undo from './Undo.svelte';
	import Mode from './Mode.svelte';
	import Download from './Download.svelte';
</script>

<nav>
	<Back />
	<Mode />
	<Undo />
	<Download />
</nav>

<style>
	nav {
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		top: 0;
		padding: 0;
		margin: 0;
		width: 100%;
	}
</style>
