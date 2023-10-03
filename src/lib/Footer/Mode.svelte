<script>
	import { mode, selectedEdge, selectedNode, selectedEllipse, selectedAngle } from '$lib/store';

	import SelectedEdge from './Selected/Edge.svelte';
	import SelectedNode from './Selected/Node.svelte';
	import SelectedEllipse from './Selected/Ellipse.svelte';
	import SelectedAngle from './Selected/Angle.svelte';
	import NextEdge from './Next/Edge.svelte';
	import NextNode from './Next/Node.svelte';
	import NextEllipse from './Next/Ellipse.svelte';
	import NextAngle from './Next/Angle.svelte';
</script>

<button
	style="opacity:{$mode === 'node' ? 1 : 0.5}"
	on:click|stopPropagation|preventDefault={() => {
		$mode = 'node';
	}}
>
	{#if $selectedNode}
		<SelectedNode />
	{:else}
		<NextNode />
	{/if}
</button>
<button
	style="opacity:{$mode === 'ellipse' ? 1 : 0.5}"
	on:click|stopPropagation|preventDefault={() => {
		$mode = 'ellipse';
	}}
>
	{#if $selectedEllipse}
		<SelectedEllipse />
	{:else}
		<NextEllipse />
	{/if}
</button>
<button
	style="opacity:{$mode === 'angle' ? 1 : 0.5}"
	on:click|stopPropagation|preventDefault={() => {
		$mode = 'angle';
	}}
>
	{#if $selectedAngle}
		<SelectedAngle />
	{:else}
		<NextAngle />
	{/if}
</button>
<button
	style="opacity:{$mode === 'edge' ? 1 : 0.5}"
	on:click|stopPropagation|preventDefault={() => {
		$mode = 'edge';
	}}
>
	{#if $selectedEdge}
		<SelectedEdge />
	{:else}
		<NextEdge />
	{/if}
</button>
