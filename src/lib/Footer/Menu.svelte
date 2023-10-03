<script>
	import Mode from './Mode.svelte';
</script>

<nav>
	<Mode />
</nav>

<style>
	nav {
		position: fixed;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		bottom: 0;
		padding: 0;
		margin: 0;
		width: 100%;
		padding-bottom: 10px;
	}
</style>
