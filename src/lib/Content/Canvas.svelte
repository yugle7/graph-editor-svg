<script>
	import Edge from './Edge.svelte';
	import Node from './Node.svelte';
	import Ellipse from './Ellipse.svelte';
	import Angle from './Angle.svelte';

	import { onMount } from 'svelte';
	import {
		changeEllipse,
		undo,
		mode,
		nextNode,
		nextEdge,
		nextEllipse,
		nextAngle,
		selectedNode,
		selectedEdge,
		selectedEllipse,
		selectedAngle,
		nodes,
		edges,
		ellipses,
		angles
	} from '$lib/store';

	import { getName, getNextName, place } from '../name';
	import { deg, distance } from '../math';

	let moveNode = false;
	$changeEllipse = false;

	let graph;

	let point = { x: 0, y: 0 };
	const timer = { o: null, O: 500 };

	function mouse(e) {
		point.x = Math.floor(e.clientX);
		point.y = Math.floor(e.clientY);
	}
	function touch(e) {
		let rect = graph.getBoundingClientRect();
		point.x = Math.floor(e.touches[0].clientX) - rect.left;
		point.y = Math.floor(e.touches[0].clientY) - rect.top;
	}
	function move() {
		let x = 10 * Math.floor(point.x / 10 + 0.5);
		let y = 10 * Math.floor(point.y / 10 + 0.5);

		const d = 2;
		if (Math.abs(point.x - x) <= d) {
			point.x = x;
		}
		if (Math.abs(point.y - y) <= d) {
			point.y = y;
		}

		if (moveNode) {
			nodeMove();
		} else if ($changeEllipse) {
			ellipseChange();
		}
	}
	function stop() {
		if (moveNode) {
			moveNode = false;
			if (timer.o && Date.now() - timer.o < timer.O) {
				$selectedNode = null;
			} else {
				place($nodes, $edges);
				$nodes = $nodes;
			}
		} else if ($changeEllipse) {
			$changeEllipse = false;
			if (timer.o && Date.now() - timer.o < timer.O) {
				$selectedEllipse = null;
			}
		}
	}

	function mouseMove(e) {
		mouse(e);
		move();
	}
	function touchMove(e) {
		touch(e);
		move();
	}

	// angle

	function getNextAngle(node) {
		const angle = {
			id: crypto.randomUUID(),
			start: $selectedEdge.start,
			center: $selectedEdge.end,
			end: node,
			...$nextAngle
		};
		const name = getName($nextAngle.name);
		if (name !== $nextAngle.name) {
			$nextAngle.name = getNextName($nextAngle.name);
			angle.name = name;
		}
		return angle;
	}
	function addNextAngle(node) {
		const angle = getNextAngle(node);
		$angles.push(angle);

		$undo.push(['-', angle]);
		$undo = $undo;

		return angle;
	}
	function removeAngle(angle) {
		if ($selectedAngle == angle) {
			$selectedAngle = null;
		}
		$angles = $angles.filter((a) => a != angle);
		$undo.push(['+', angle]);
		$undo = $undo;
	}
	function modifyAngle(angle, name, width, color) {
		$undo.push(['~', { ...angle }]);
		$undo = $undo;

		angle.name = name;
		angle.width = width;
		angle.color = color;
	}
	function selectAngle(angle) {
		if ($selectedAngle == angle) {
			$selectedAngle = null;
		} else {
			$selectedAngle = angle;
		}
	}
	$: if ($selectedAngle) {
		$angles = $angles;
	}

	function handleAngleCanvasClick() {
		const node = addNextNode();
		if ($selectedNode) {
			const edge = addNextEdge(node);
			if ($selectedEdge && $selectedEdge.end == $selectedNode) {
				const angle = addNextAngle(node);
				selectAngle(angle);
			}
			selectEdge(edge);
		}
		selectNode(node);
	}
	function handleAngleClick(angle) {
		if ($mode === 'delete') {
			removeAngle(angle);
		} else if ($mode === 'angle' || $mode == 'move') {
			selectAngle(angle);
		}
	}

	// ellipse

	function getNextEllipse(node) {
		const ellipse = {
			id: crypto.randomUUID(),
			center: node,
			...$nextEllipse
		};
		return ellipse;
	}
	function addNextEllipse(node) {
		const ellipse = getNextEllipse(node);
		$ellipses.push(ellipse);

		$undo.push(['-', ellipse]);
		$undo = $undo;

		return ellipse;
	}
	function removeEllipse(ellipse) {
		if ($selectedEllipse == ellipse) {
			$selectedEllipse = null;
		}
		$ellipses = $ellipses.filter((e) => e != ellipse);
		$undo.push(['+', ellipse]);
		$undo = $undo;
	}
	function selectEllipse(ellipse) {
		$selectedEllipse = ellipse;
		startEllipseChange();
	}
	$: if ($selectedEllipse) {
		$ellipses = $ellipses;
	}

	let R, A;

	function startEllipseChange() {
		const r = distance($selectedEllipse.center, point);
		const a = deg($selectedEllipse.center, point);

		if (Math.abs(a - $selectedEllipse.a) < 10) {
			$selectedEllipse.a = a;
			$selectedEllipse.rx = r;
			A = null;
			R = null;
		} else {
			A = a - $selectedEllipse.a;
			R = {
				x: $selectedEllipse.rx / r,
				y: $selectedEllipse.ry / r
			};
		}
		$changeEllipse = true;
		timer.o = Date.now();
	}
	function ellipseChange() {
		const r = distance($selectedEllipse.center, point);
		if (r > 10) {
			const a = deg($selectedEllipse.center, point);

			if (A !== null) {
				$selectedEllipse.rx = Math.floor(R.x * r + 0.5);
				$selectedEllipse.ry = Math.floor(R.y * r + 0.5);
				$selectedEllipse.a = (360 + a - A) % 360;
			} else {
				$selectedEllipse.rx = r;
				$selectedEllipse.a = a;
			}
		}
	}

	function handleEllipseCanvasClick() {
		const node = addNextNode();
		addNextEllipse(node);
		selectNode(node);
	}
	function handleEllipseClick(ellipse) {
		if ($mode === 'delete') {
			removeEllipse(ellipse);
		} else {
			selectEllipse(ellipse);
		}
	}

	// edge

	function getNextEdge(node) {
		const edge = {
			id: crypto.randomUUID(),
			start: $selectedNode,
			end: node,
			...$nextEdge
		};
		const name = getName($nextEdge.name);
		if (name !== $nextEdge.name) {
			$nextEdge.name = getNextName($nextEdge.name);
			edge.name = name;
		}
		return edge;
	}
	function addNextEdge(node) {
		const edge = getNextEdge(node);
		$edges.push(edge);

		$undo.push(['-', edge]);
		$undo = $undo;

		return edge;
	}
	function addEdge(start, end, name, width, type) {
		const edge = {
			id: crypto.randomUUID(),
			start: start,
			end: end,
			width: width,
			name: name,
			type: type
		};
		$edges.push(edge);

		$undo.push(['-', edge]);
		$undo = $undo;
	}
	function removeEdge(edge) {
		if ($selectedEdge == edge) {
			$selectedEdge = null;
		}
		$edges = $edges.filter((e) => e != edge);
		$undo.push(['+', edge]);
		$undo = $undo;
	}
	function modifyEdge(edge, start, end, name, width, type) {
		$undo.push(['~', { ...edge }]);
		$undo = $undo;

		edge.start = start;
		edge.end = end;
		edge.name = name;
		edge.width = width;
		edge.type = type;
	}
	function selectEdge(edge) {
		$selectedEdge = $selectedEdge == edge ? null : edge;
	}
	$: if ($selectedEdge) {
		$edges = $edges;
	}

	function handleEdgeCanvasClick() {
		const node = addNextNode();
		if ($selectedNode) {
			const edge = addNextEdge(node);
			selectEdge(edge);
		}
		selectNode(node);
	}
	function handleEdgeClick(edge) {
		if ($mode === 'delete') {
			$angles
				.filter((a) => a.center == edge.start || a.center == edge.end)
				.forEach((a) => removeAngle(a));
			removeEdge(edge);
		} else if ($mode === 'edge') {
			if ($selectedNode) {
				const node = addNextNode();
				$angles
					.filter(
						(a) =>
							(a.center == edge.start || a.center == edge.end) &&
							(a.start == edge.start || a.start == edge.end)
					)
					.forEach((a) => {
						a.start = node;
					});
				$angles
					.filter(
						(a) =>
							(a.center == edge.start || a.center == edge.end) &&
							(a.end == edge.start || a.end == edge.end)
					)
					.forEach((a) => {
						a.end = node;
					});

				if ($selectedNode == edge.start) {
					modifyEdge(edge, node, edge.end, '', edge.width, edge.type);
				} else if ($selectedNode == edge.end) {
					modifyEdge(edge, edge.start, node, '', edge.width, edge.type);
				} else {
					removeEdge(edge);
					addEdge(edge.start, node, '', edge.width, edge.type);
					addEdge(node, edge.end, '', edge.width, edge.type);
				}
				selectEdge(addNextEdge(node));
				selectNode(node);
			} else {
				selectEdge(edge);
			}
		} else if ($mode === 'node') {
			const node = addNextNode();
			addEdge(edge.start, node, '', edge.width, edge.type);
			modifyEdge(edge, node, edge.end, '', edge.width, edge.type);
			selectNode(node);
		} else if ($mode == 'move') {
			selectEdge(edge);
		}
	}

	// node

	function getNextNode() {
		const node = {
			id: crypto.randomUUID(),
			...point,
			...$nextNode
		};
		const name = getName($nextNode.name);
		if (name !== $nextNode.name) {
			$nextNode.name = getNextName($nextNode.name);
			node.name = name;
		}
		return node;
	}
	function addNextNode() {
		const node = getNextNode();
		$nodes.push(node);
		$undo.push(['-', node]);
		$undo = $undo;
		return node;
	}
	function removeNode(node) {
		if ($selectedNode == node) {
			$selectedNode = null;
		}
		$nodes = $nodes.filter((n) => n != node);
		$undo.push(['+', node]);
		$undo = $undo;
	}
	function selectNode(node) {
		timer.o = $selectedNode == node ? Date.now() : null;
		$selectedNode = node;
		moveNode = true;
	}
	$: if ($selectedNode) {
		$nodes = $nodes;
		$edges = $edges;
		$ellipses = $ellipses;
		$angles = $angles;
	}

	function nodeMove() {
		$selectedNode.x = point.x;
		$selectedNode.y = point.y;
	}

	function handleNodeCanvasClick() {
		const node = addNextNode();
		selectNode(node);
	}
	function handleEdgeNodeClick(node) {
		if ($selectedNode && $selectedNode != node) {
			let edge = $edges.find(
				(e) =>
					(e.start == $selectedNode && e.end == node) || (e.start == node && e.end == $selectedNode)
			);
			if (edge) {
				modifyEdge(edge, $selectedNode, node, edge.name, $nextEdge.width, $nextEdge.type);
			} else {
				edge = addNextEdge(node);
			}
			selectEdge(edge);
		}
		selectNode(node);
	}
	function handleAngleNodeClick(node) {
		if ($selectedNode && $selectedNode != node) {
			if ($selectedEdge && $selectedEdge.start != node && $selectedEdge.end == $selectedNode) {
				let angle = $angles.find(
					(a) =>
						a.center == $selectedNode &&
						((a.start == $selectedEdge.start && a.end == node) ||
							(a.start == node && a.end == $selectedEdge.start))
				);
				if (angle) {
					modifyAngle(angle, $nextAngle.name, $nextAngle.width, $nextAngle.color);
				} else {
					angle = addNextAngle(node);
				}
				selectAngle(angle);
			}
		}
	}
	function handleEllipseNodeClick(node) {
		const ellipse = $ellipses.find((e) => e.center == node);
		if (!ellipse) {
			addNextEllipse(node);
		}
		selectNode(node);
	}
	function handleNodeClick(node) {
		if ($mode === 'delete') {
			$angles
				.filter((a) => a.start == node || a.center == node || a.end == node)
				.forEach((a) => removeAngle(a));
			$edges.filter((e) => e.start == node || e.end == node).forEach((e) => removeEdge(e));
			$ellipses.filter((e) => e.center == node).forEach((e) => removeEllipse(e));
			removeNode(node);
		} else if ($mode === 'edge') {
			handleEdgeNodeClick(node);
		} else if ($mode === 'angle') {
			handleAngleNodeClick(node);
			handleEdgeNodeClick(node);
		} else if ($mode === 'ellipse') {
			handleEllipseNodeClick(node);
		} else {
			selectNode(node);
		}
	}

	onMount(() => {
		window.addEventListener('mousemove', mouseMove);
		window.addEventListener('mouseup', stop);
		window.addEventListener('touchmove', touchMove);
		window.addEventListener('touchend', stop);

		return () => {
			window.removeEventListener('mousemove', mouseMove);
			window.removeEventListener('mouseup', stop);
			window.removeEventListener('touchmove', touchMove);
			window.removeEventListener('touchend', stop);
		};
	});

	function handleCanvasClick(e) {
		if (e.target.nodeName === 'svg') {
			if ($mode === 'node') {
				handleNodeCanvasClick();
			} else if ($mode === 'edge') {
				handleEdgeCanvasClick();
			} else if ($mode === 'ellipse') {
				handleEllipseCanvasClick();
			} else if ($mode === 'angle') {
				handleAngleCanvasClick();
			}
		}
		timer.o = null;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	on:mousedown|preventDefault={(e) => {
		mouse(e);
		handleCanvasClick(e);
	}}
	on:touchstart|preventDefault={(e) => {
		touch(e);
		handleCanvasClick(e);
	}}
	bind:this={graph}
>
	{#each $edges as edge (edge.id)}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<g
			on:mousedown={(e) => {
				mouse(e);
				handleEdgeClick(edge);
			}}
			on:touchstart={(e) => {
				touch(e);
				handleEdgeClick(edge);
			}}
		>
			<Edge {edge} />
		</g>
	{/each}
	{#each $nodes as node (node.id)}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<g
			on:mousedown={(e) => {
				mouse(e);
				handleNodeClick(node);
			}}
			on:touchstart={(e) => {
				touch(e);
				handleNodeClick(node);
			}}
		>
			<Node {node} />
		</g>
	{/each}
	{#each $ellipses as ellipse (ellipse.id)}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<g
			on:mousedown={(e) => {
				mouse(e);
				handleEllipseClick(ellipse);
			}}
			on:touchstart={(e) => {
				touch(e);
				handleEllipseClick(ellipse);
			}}
		>
			<Ellipse {ellipse} />
		</g>
	{/each}
	{#each $angles as angle (angle.id)}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<g
			on:mousedown={(e) => {
				mouse(e);
				handleAngleClick(angle);
			}}
			on:touchstart={(e) => {
				touch(e);
				handleAngleClick(angle);
			}}
		>
			<Angle {angle} />
		</g>
	{/each}
</svg>

<style>
	svg {
		background: linear-gradient(var(--color-1), transparent 1px),
			linear-gradient(90deg, var(--color-1), transparent 1px);
		background-size: 20px 20px;
		background-position: top top;
	}
</style>
