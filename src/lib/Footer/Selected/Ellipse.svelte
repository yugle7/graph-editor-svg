<script>
	import { getColor } from '$lib/color';
	import { mode, selectedEllipse, changeEllipse } from '$lib/store';

	import { getLength } from '$lib/name';

	const ry = 13;
	const rx = 13;

	const d = 3;

	$: w = 2 * rx + d + 1;
	$: h = 2 * ry + d + 1;

	$: cx = w / 2;
	$: cy = h / 2;

	function handleAngle() {
		let a = angle.replace(/\D/, '');
		if (a === '') {
			a = 0;
		} else {
			a = parseInt(a) % 360;
			if (angle[0] === '-') {
				a = 360 - a;
			}
		}
		$selectedEllipse.a = a;
		angle = String(a);
	}
	let angle = String($selectedEllipse?.a);

	$: if ($changeEllipse) {
		angle = String($selectedEllipse.a);
	}
	
	$: console.log($selectedEllipse);
</script>

{#if $selectedEllipse}
	<div style="width:{w + 18 + getLength(angle)}px">
		<button
			on:click={() => {
				if ($mode === 'ellipse') {
					$selectedEllipse.color++;
				}
			}}
		>
			<svg style="width:{w}px;height:{h}px" stroke={getColor($selectedEllipse.color)}>
				<ellipse {cx} {cy} {rx} {ry} fill="none" />
				<line
					x1={cx + rx - d}
					y1={cy}
					x2={cx + rx + d}
					y2={cy}
					style="transform-origin: {cx}px {cy}px;
				transform: rotate({$selectedEllipse.a}deg)"
				/>
			</svg>
		</button>
		<span>
			°<input bind:value={angle} on:keyup={handleAngle} />
		</span>
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-direction: row;
		width: auto;
		position: relative;
	}
	span {
		position: absolute;
		top: 5px;
		left: 25px;
		color: gray;
	}
	input {
		padding: 0;
		margin: 0;
	}
</style>
