<script>
	import Content from '$lib/Content/Canvas.svelte';
	import Header from '$lib/Header/Menu.svelte';
	import Footer from '$lib/Footer/Menu.svelte';
	import Image from '$lib/Content/Image.svelte';
	import { page } from '$app/stores';
	import {
		nodes,
		edges,
		ellipses,
		angles,
		selectedNode,
		selectedEdge,
		selectedEllipse,
		selectedAngle
	} from '$lib/store';
	import { pb } from '$lib/pocketbase';

	import { onMount } from 'svelte';
	import { setCtx } from '$lib/name';
	import { download, upload } from '$lib/image';

	$selectedNode = null;
	$selectedEdge = null;
	$selectedEllipse = null;
	$selectedAngle = null;

	onMount(async () => {
		setCtx(document);

		const graph = await pb.collection('graphs').getOne($page.params.id, {
			expand: 'nodes,edges,ellipses,angles'
		});
		console.log(graph);
		if (graph.expand) {
			$nodes = graph.expand.nodes.map((n) => {
				return {
					id: n.id,
					name: n.name,
					color: n.color,
					radius: n.radius,
					x: n.x,
					y: n.y
				};
			});
			const node = {};
			$nodes.forEach((n) => {
				node[n.id] = n;
			});
			if (graph.edges.length > 0) {
				$edges = graph.expand.edges.map((e) => {
					return {
						id: e.id,
						name: e.name,
						type: e.type,
						width: e.width,
						start: node[e.start],
						end: node[e.end]
					};
				});
			}
			if (graph.ellipses.length > 0) {
				$ellipses = graph.expand.ellipses.map((e) => {
					return {
						id: e.id,
						width: e.width,
						color: e.color,
						a: e.a,
						rx: e.rx,
						ry: e.ry,
						center: node[e.center]
					};
				});
			}
			if (graph.angles.length > 0) {
				$angles = graph.expand.angles.map((a) => {
					return {
						id: a.id,
						name: a.name,
						color: a.color,
						width: a.width,
						start: node[a.start],
						center: node[a.center],
						end: node[a.end]
					};
				});
			}
		}
	});
</script>

<Header />
<Content />
<Footer />

{#if $download || $upload}
	<Image />
{/if}
