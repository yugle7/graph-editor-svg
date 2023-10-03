<script>
	export let edge;

	import { selectedEdge } from '$lib/store';

	export let edit = true;

	$: opacity = edit && $selectedEdge && edge != $selectedEdge ? 0.3 : 0.7;

	const h = 10;

	$: d = 7 + edge.width;
	$: r = edge.end.radius;
	$: l = edge.name.length;

	$: x1 = edge.start.x;
	$: x2 = edge.end.x;
	$: y1 = edge.start.y;
	$: y2 = edge.end.y;

	$: a = Math.atan2(y2 - y1, x2 - x1);

	let R, A, x, y;

	$: if (l > 0) {
		R = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2 - 4 * l;
		if (2 * Math.abs(a) < Math.PI) {
			A = a;
			x = x1;
			y = y1;
		} else {
			A = a + Math.PI;
			x = x2;
			y = y2;
		}
	}
</script>

{#if edit}
	<line {x1} {y1} {x2} {y2} stroke="#fff0" stroke-width={h} />
{/if}

<g {opacity} stroke="gray" stroke-width={edge.width}>
	{#if edge.type % 3 === 2}
		<line {x1} {y1} {x2} {y2} stroke-dasharray="8 4" />
	{:else}
		<line {x1} {y1} {x2} {y2} />
	{/if}

	{#if edge.type % 3 === 1}
		<polyline
			points="{x2 - d},{y2 + d} {x2},{y2} {x2 - d},{y2 - d} {x2},{y2}"
			style="transform-origin: {x2}px {y2}px;
			transform: rotate({a}rad) translateX(-{r}px)"
		/>
	{/if}

	{#if l > 0}
		<text
			{x}
			y={y + 14}
			fill="gray"
			stroke-width="0"
			style="transform-origin: {x}px {y}px;
			transform: rotate({A}rad) translateX({R}px);"
		>
			{edge.name}
		</text>
	{/if}
</g>
