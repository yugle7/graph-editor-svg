<script>
	import { mode, nodes } from '$lib/store';
	$: disabled = $nodes.length === 0;
</script>

<button
	{disabled}
	style="opacity: {$mode === 'move' ? 1 : 0.5};"
	on:click={() => {
		$mode = 'move';
	}}
>
	<img src="Outline/Interface/Check.svg" alt="move" />
</button>
<button
	{disabled}
	style="opacity: {$mode === 'delete' ? 1 : 0.5};"
	on:click={() => {
		$mode = 'delete';
	}}
>
	<img src="Outline/Interface/Cross.svg" alt="delete" />
</button>
