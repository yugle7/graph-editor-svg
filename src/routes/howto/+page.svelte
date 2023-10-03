<script>
	import { profile } from '$lib/pocketbase';

	$: to = $profile ? 'User' : 'Home';
</script>

<a href="/">
	<img src="Outline/Communication/{to}.svg" alt={to} />
</a>
<div>
	<h2>Инструкция</h2>
</div>

<style>
	div {
		padding: 10px;
	}
	a {
		position: fixed;
		right: 0;
		padding: 10px;
	}
</style>
