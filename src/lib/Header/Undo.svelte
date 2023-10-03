<script>
	import {
		undo,
		redo,
		nodes,
		edges,
		ellipses,
		angles,
		selectedNode,
		selectedEdge,
		selectedEllipse,
		selectedAngle
	} from '$lib/store';

	function isAngle(element) {
		return element.hasOwnProperty('start') && element.hasOwnProperty('center');
	}
	function isEdge(element) {
		return element.hasOwnProperty('start');
	}
	function isEllipse(element) {
		return element.hasOwnProperty('center');
	}
</script>

<button
	disabled={$undo.length === 0}
	on:click={() => {
		let [action, element] = $undo.pop();
		switch (action) {
			case '+': {
				$redo.push(['-', element]);
				if (isAngle(element)) {
					$angles.push(element);
					$angles = $angles;
				} else if (isEdge(element)) {
					$edges.push(element);
					$edges = $edges;
				} else if (isEllipse(element)) {
					$ellipses.push(element);
					$ellipses = $ellipses;
				} else {
					$nodes.push(element);
					$nodes = $nodes;
				}
				break;
			}
			case '-': {
				$redo.push(['+', element]);
				if (isAngle(element)) {
					if (element == $selectedAngle) {
						$selectedAngle = null;
					}
					$angles = $angles.filter((a) => a != element);
				} else if (isEdge(element)) {
					if (element == $selectedEdge) {
						$selectedEdge = null;
					}
					$edges = $edges.filter((e) => e != element);
				} else if (isEllipse(element)) {
					if (element == $selectedEllipse) {
						$selectedEllipse = null;
					}
					$ellipses = $ellipses.filter((e) => e != element);
				} else {
					if (element == $selectedNode) {
						$selectedNode = null;
					}
					$nodes = $nodes.filter((n) => n != element);
				}
				break;
			}
			case '~': {
				if (isAngle(element)) {
					const angle = $angles.find((a) => a.id === element.id);
					$redo.push(['~', { ...angle }]);
					angle.name = element.name;
					angle.width = element.width;
					angle.color = element.color;
					$angles = $angles;
				} else if (isEdge(element)) {
					const edge = $edges.find((e) => e.id === element.id);
					$redo.push(['~', { ...edge }]);
					edge.start = element.start;
					edge.end = element.end;
					edge.width = element.width;
					edge.type = element.type;
					$edges = $edges;
				}
				break;
			}
		}

		$redo = $redo;
		$undo = $undo;
	}}
>
	<img src="Outline/Communication/Undo.svg" alt="undo" />
</button>
<button
	disabled={$redo.length === 0}
	on:click={() => {
		let [action, element] = $redo.pop();
		switch (action) {
			case '+': {
				$undo.push(['-', element]);
				if (isAngle(element)) {
					$angles.push(element);
					$angles = $angles;
				} else if (isEdge(element)) {
					$edges.push(element);
					$edges = $edges;
				} else if (isEllipse(element)) {
					$ellipses.push(element);
					$ellipses = $ellipses;
				} else {
					$nodes.push(element);
					$nodes = $nodes;
				}
				break;
			}
			case '-': {
				$undo.push(['+', element]);
				if (isAngle(element)) {
					if (element == $selectedAngle) {
						$selectedAngle = null;
					}
					$angles = $angles.filter((a) => a != element);
				} else if (isEdge(element)) {
					if (element == $selectedEdge) {
						$selectedEdge = null;
					}
					$edges = $edges.filter((e) => e != element);
				} else if (isEllipse(element)) {
					if (element == $selectedEllipse) {
						$selectedEllipse = null;
					}
					$ellipses = $ellipses.filter((e) => e != element);
				} else {
					if (element == $selectedNode) {
						$selectedNode = null;
					}
					$nodes = $nodes.filter((n) => n != element);
				}
				break;
			}
			case '~': {
				if (isAngle(element)) {
					const angle = $angles.find((a) => a.id === element.id);
					$redo.push(['~', { ...angle }]);
					angle.name = element.name;
					angle.width = element.width;
					angle.color = element.color;
					$angles = $angles;
				} else if (isEdge(element)) {
					const edge = $edges.find((e) => e.id === element.id);
					$undo.push(['~', { ...edge }]);
					edge.start = element.start;
					edge.end = element.end;
					edge.width = element.width;
					edge.type = element.type;
					$edges = $edges;
				}
				break;
			}
		}
		$undo = $undo;
		$redo = $redo;
	}}
>
	<img src="Outline/Communication/Redo.svg" alt="redo" />
</button>
