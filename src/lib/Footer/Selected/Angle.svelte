<script>
	import { getColor } from '$lib/color';
	import { getLength } from '$lib/name';
	import { mode, selectedAngle } from '$lib/store';

	const r = 30;
	const R = r + 20;

	const a = 60;
	const b = (a * Math.PI) / 180;
	const sin = Math.sin(b);
	const cos = Math.cos(b);

	const d = 4;

	const w = R + 2 * d;
	const h = R + 2 * d;

	const l = 2 * Math.PI * r;
	const s = (l * a) / 360;

	const cx = d;
	const cy = h - d;
</script>

<div style="width:{w + getLength($selectedAngle.name)}px">
	<button
		on:click={() => {
			if ($mode === 'angle') {
				$selectedAngle.color++;
			}
		}}
	>
		<svg style="width:{w}px;height:{h}px" stroke-width="1" stroke="black">
			<circle
				{cx}
				{cy}
				{r}
				stroke={getColor($selectedAngle.color)}
				fill="none"
				stroke-width={$selectedAngle.width}
				stroke-dasharray="{s} {l - s}"
				style="transform-origin: {cx}px {cy}px;
			transform: rotate({-a}deg)"
			/>
			<line x1={cx + R} y1={cy} x2={cx} y2={cy} />
			<line x1={cx + R * cos} y1={cy - R * sin} x2={cx} y2={cy} />
			<polyline points="{cx + 1},{cy} {cx},{cy} {cx + cos},{cy - sin}" />
		</svg>
	</button>
	<input bind:value={$selectedAngle.name} />
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		width: auto;
		position: relative;
	}

	input {
		position: absolute;
		top: 20px;
		left: 40px;
		padding: 0;
		margin: 0;
	}
</style>
