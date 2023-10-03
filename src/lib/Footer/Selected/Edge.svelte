<script>
	import { mode, selectedEdge } from '$lib/store';
	import { getLength } from '$lib/name';

	$: l = getLength($selectedEdge.name);
	$: d = 8 + $selectedEdge.width;

	const x = 40;

	$: w = 2 * x + l;
	$: h = 2 * d;

	$: x1 = d;
	$: y1 = d;
	$: x2 = w - d;
	$: y2 = d;

	const stroke = 'black';
</script>

<div>
	<button
		on:click={() => {
			if ($mode === 'edge') {
				$selectedEdge.type++;
			}
		}}
	>
		<svg style="width:{w}px;height:{h}px" stroke="gray">
			{#if $selectedEdge.type % 3 == 2}
				<line {x1} {y1} {x2} {y2} stroke-width={$selectedEdge.width} stroke-dasharray="8 4" />
			{:else}
				<line {x1} {y1} {x2} {y2} stroke-width={$selectedEdge.width} />
			{/if}

			{#if $selectedEdge.type % 3 == 1}
				<polyline
					points="{x2 - d},{y2 + d} {x2},{y2} {x2 - d},{y2 - d} {x2},{y2}"
					stroke-width={$selectedEdge.width}
				/>
			{/if}
		</svg>
	</button>
	<input style="width:{w}px" bind:value={$selectedEdge.name} />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		width: auto;
		align-items: center;
	}
	input {
		padding: 0;
		margin: 0;
		margin-top: -8px;
		text-align: center;
	}
</style>
