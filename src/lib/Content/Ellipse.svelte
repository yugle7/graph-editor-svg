<script>
	import { getColor } from '$lib/color';
	import { selectedEllipse } from '$lib/store';

	export let ellipse;
	export let edit = true;

	$: opacity = edit && $selectedEllipse && ellipse != $selectedEllipse ? 0.5 : 1;

	const d = 5;
	const h = 12;
</script>

{#if edit}
	<ellipse
		cx={ellipse.center.x}
		cy={ellipse.center.y}
		rx={ellipse.rx}
		ry={ellipse.ry}
		fill="none"
		stroke="#fff0"
		stroke-width={h}
		style="transform-origin: {ellipse.center.x}px {ellipse.center.y}px;
	transform: rotate({ellipse.a}deg)"
	/>
	{#if $selectedEllipse == ellipse}
		<line
			x1={ellipse.center.x + ellipse.rx - d}
			y1={ellipse.center.y}
			x2={ellipse.center.x + ellipse.rx + d}
			y2={ellipse.center.y}
			stroke={getColor(ellipse.color)}
			style="transform-origin: {ellipse.center.x}px {ellipse.center.y}px;
		transform: rotate({ellipse.a}deg)"
		/>
	{/if}
{/if}

<ellipse
	{opacity}
	cx={ellipse.center.x}
	cy={ellipse.center.y}
	rx={ellipse.rx}
	ry={ellipse.ry}
	fill="none"
	stroke={getColor(ellipse.color)}
	style="transform-origin: {ellipse.center.x}px {ellipse.center.y}px;
	transform: rotate({ellipse.a}deg)"
/>
