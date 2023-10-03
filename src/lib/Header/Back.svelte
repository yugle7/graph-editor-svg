<script>
	import { page } from '$app/stores';
	import { login, edit, nodes, edges, ellipses, angles } from '$lib/store';
	import { image, upload, getImage } from '$lib/image';
	import { pb, profile } from '$lib/pocketbase';
	import { goto } from '$app/navigation';

	pb.autoCancellation(false);
	const graphId = $page.params?.id;

	function inPb(rec) {
		return rec.id.length === 15;
	}

	async function saveGraph() {
		await Promise.all(
			$nodes.map(async (node) => {
				if (inPb(node)) {
					await pb.collection('nodes').update(node.id, node);
				} else {
					delete node.id;
					const res = await pb.collection('nodes').create(node);
					node.id = res.id;
				}
			})
		);
		if ($edges.length > 0) {
			await Promise.all(
				$edges.map(async (e) => {
					e.start = e.start.id;
					e.end = e.end.id;

					if (inPb(e)) {
						await pb.collection('edges').update(e.id, e);
					} else {
						delete e.id;
						const res = await pb.collection('edges').create(e);
						e.id = res.id;
					}
				})
			);
		}
		if ($ellipses.length > 0) {
			await Promise.all(
				$ellipses.map(async (e) => {
					e.center = e.center.id;

					if (inPb(e)) {
						await pb.collection('ellipses').update(e.id, e);
					} else {
						delete e.id;
						const res = await pb.collection('ellipses').create(e);
						e.id = res.id;
					}
				})
			);
		}
		if ($angles.length > 0) {
			await Promise.all(
				$angles.map(async (a) => {
					a.start = a.start.id;
					a.end = a.end.id;
					a.center = a.center.id;

					if (inPb(a)) {
						await pb.collection('angles').update(a.id, a);
					} else {
						delete a.id;
						const res = await pb.collection('angles').create(a);
						a.id = res.id;
					}
				})
			);
		}
		if (graphId) {
			await pb.collection('graphs').update(graphId, {
				nodes: $nodes.map((n) => n.id),
				edges: $edges.map((e) => e.id),
				ellipses: $ellipses.map((e) => e.id),
				angles: $angles.map((a) => a.id),
				image: getImage()
			});
			$edit = false;
		} else {
			const res = await pb.collection('graphs').create({
				author: $profile.id,
				nodes: $nodes.map((n) => n.id),
				edges: $edges.map((e) => e.id),
				ellipses: $ellipses.map((e) => e.id),
				angles: $angles.map((a) => a.id),
				image: getImage()
			});
			$edit = false;
			goto('/' + res.id);
		}
	}
	$: if ($image && $upload) {
		saveGraph();
	}
</script>

{#if $profile}
	<button
		on:click|preventDefault={() => {
			if ($nodes.length > 0) {
				$upload = true;
			} else {
				$edit = false;
			}
		}}
	>
		<img src="Outline/Interface/Arrow left.svg" alt="view" />
	</button>
{:else}
	<button
		on:click|preventDefault={() => {
			$login = true;
		}}
	>
		<img src="Outline/Interface/Login.svg" alt="login" />
	</button>
{/if}
