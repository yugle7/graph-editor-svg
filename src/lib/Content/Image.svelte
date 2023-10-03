<script>
	import Edge from './Edge.svelte';
	import Node from './Node.svelte';
	import Ellipse from './Ellipse.svelte';
	import Angle from './Angle.svelte';

	import { onMount } from 'svelte';
	import { nodes, edges, ellipses, angles, edit } from '$lib/store';
	import { image } from '$lib/image';

	if ($nodes.length === 0) {
		$edit = true;
	}
	let left, right, top, down;
	let ready = false;

	const d = 40;

	onMount(() => {
		const x = $nodes.map((node) => node.x);
		const y = $nodes.map((node) => node.y);

		left = Math.min(...x);
		right = Math.max(...x);
		top = Math.min(...y);
		down = Math.max(...y);

		$ellipses.forEach((e) => {
			const r = Math.max(e.rx, e.ry);
			left = Math.min(left, e.center.x - r);
			right = Math.max(right, e.center.x + r);
			top = Math.min(top, e.center.y - r);
			down = Math.max(down, e.center.y + r);
		});

		left -= d;
		right += d;
		top -= d;
		down += d;

		ready = true;
	});

	function getNode(node) {
		return { ...node, x: node.x - left, y: node.y - top };
	}
	function getEdge(edge) {
		return { ...edge, start: getNode(edge.start), end: getNode(edge.end) };
	}
	function getEllipse(ellipse) {
		return { ...ellipse, center: getNode(ellipse.center) };
	}
	function getAngle(angle) {
		return {
			...angle,
			start: getNode(angle.start),
			end: getNode(angle.end),
			center: getNode(angle.center)
		};
	}
</script>

{#if ready}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={right - left}
		height={down - top}
		style="width:{right - left}px;height:{down - top}px;"
		bind:this={$image}
	>
		{#each $edges.map(getEdge) as edge (edge.id)}
			<Edge {edge} edit={false} />
		{/each}
		{#each $nodes.map(getNode) as node (node.id)}
			<Node {node} edit={false} />
		{/each}
		{#each $ellipses.map(getEllipse) as ellipse (ellipse.id)}
			<Ellipse {ellipse} edit={false} />
		{/each}
		{#each $angles.map(getAngle) as angle (angle.id)}
			<Angle {angle} edit={false} />
		{/each}
	</svg>
{/if}
