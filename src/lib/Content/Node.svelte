<script>
	import { getColor } from '$lib/color';
	import { getLength } from '$lib/name';
	import { selectedNode } from '$lib/store';

	export let node;
	export let edit = true;

	$: opacity = edit && $selectedNode && node != $selectedNode ? 0.5 : 1;

	const R = 10;
	$: r = node.radius;

	const h = 12;
	$: l = getLength(node.name);

	const s = [1, 0.7, 0, -0.7, -1, -0.7, 0, 0.7, 1, 0.7];
	const t = [0.5, 0, 0, 0, 0.5, 1, 1, 1, 0.5, 0];

	let x, y;
	$: p = node.place || 0;

	$: if (l > 0) {
		x = node.x + (r + 3) * s[p] - l * t[p + 2];
		y = node.y + (r + 3) * s[p + 2] + h * t[p];
	}
</script>

{#if edit}
	{#if r < R}
		<circle cx={node.x} cy={node.y} {R} fill="#fff0" />
	{/if}
	<circle cx={node.x} cy={node.y} {r} fill="white" />
{/if}

<g {opacity}>
	<circle cx={node.x} cy={node.y} {r} fill={getColor(node.color)} />

	{#if l > 0}
		<text {x} {y} fill="gray">{node.name}</text>
	{/if}
</g>
