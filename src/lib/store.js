import { readable, writable } from "svelte/store";

export const nextNode = writable({
    name: 'A++',
    radius: 3,
    color: 0
});

export const nextEdge = writable({
    name: 'a++',
    width: 1,
    type: 0
});

export const nextEllipse = writable({
    width: 1,
    color: 0,
    rx: 40,
    ry: 40,
    a: 0
});

export const nextAngle = writable({
    name: 'а++',
    width: 1,
    color: 1
});

export const changeEllipse = writable(false);

export const selectedNode = writable(null);
export const selectedEdge = writable(null);
export const selectedEllipse = writable(null);
export const selectedAngle = writable(null);

export const nodes = writable([]);
export const edges = writable([]);
export const ellipses = writable([]);
export const angles = writable([]);

export const undo = writable([]);
export const redo = writable([]);

export function reset() {
    selectedNode.set(null);
    selectedEdge.set(null);
    selectedEllipse.set(null);
    selectedAngle.set(null);

    nodes.set([]);
    edges.set([]);
    ellipses.set([]);
    angles.set([]);

    undo.set([]);
    redo.set([]);
}

export const mode = writable('edge');
export const opacity = readable(0.5);

export const edit = writable(false);
export const login = writable(false);

