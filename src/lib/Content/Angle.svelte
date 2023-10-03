<script>
	import { getColor } from '$lib/color';
	import { selectedAngle } from '$lib/store';
	import { deg } from '$lib/math';

	export let angle;
	export let edit = true;

	function getName(name) {
		if (name.length === 1 && 'а' <= name && name <= 'я') {
			const d = name.charCodeAt(0) - 1072;
			if (d < 25) {
				return String.fromCharCode(945 + d);
			}
		}
		return name;
	}

	$: name = getName(angle.name);

	const r = angle.center.radius + 6;
	const h = 4;

	$: cx = angle.center.x;
	$: cy = angle.center.y;

	$: A = deg(angle.center, angle.start);
	$: B = deg(angle.center, angle.end);
	$: a = Math.min(A, B);
	$: b = A + B - a;

	$: c = (Math.PI * ((a + b) / 2 - 180 * (b - a > 180))) / 180;
	$: x = cx + 2 * r * Math.cos(c) - 4;
	$: y = cy + 2 * r * Math.sin(c) + 5;

	$: L = 2 * Math.PI * r;
	$: S = ((b - a) * L) / 360;
	$: T = L - S;
	$: s = Math.min(S, T);
	$: t = S + T - s;

	$: opacity = edit && $selectedAngle && angle != $selectedAngle ? 0.5 : 1;
</script>

{#if edit}
	<circle {cx} {cy} {r} stroke="#fff0" stroke-width={h} fill="none" />
{/if}
<circle
	{opacity}
	{cx}
	{cy}
	{r}
	stroke={getColor(angle.color)}
	stroke-width={angle.width}
	stroke-dasharray="{s} {t}"
	fill="none"
	style="transform-origin: {angle.center.x}px {angle.center.y}px;
	transform: rotate({b - a > 180 ? b : a}deg)"
/>
{#if name.length > 0}
	<text {x} {y} fill="gray">
		{name}
	</text>
{/if}
