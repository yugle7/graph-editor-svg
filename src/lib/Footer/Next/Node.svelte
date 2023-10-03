<script>
	import { getColor } from '$lib/color';
	import { getLength } from '$lib/name';
	import { mode, nextNode } from '$lib/store';

	$: r = $nextNode.radius;

	$: h = 2 * r;
	$: w = h + 4;

	$: cx = h / 2;
	$: cy = cx;
</script>

<div style="width:{w + 10 + getLength($nextNode.name)}px">
	<button
		on:click={() => {
			if ($mode === 'node') {
				$nextNode.color++;
			}
		}}
	>
		<svg style="width:{w}px;height:{h}px">
			<circle {cx} {cy} {r} fill={getColor($nextNode.color)} />
		</svg>
	</button>
	<input bind:value={$nextNode.name} />
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
	}
	input {
		padding: 0;
		margin: 0;
		text-indent: 2px;
		margin-left: -3px;
		width: 100%;
	}
</style>
