import { get, writable } from "svelte/store";
import { angle } from "./math";

export function getName(name) {
    return name.replace(/\+\+/g, "");
}

export function getNextName(name) {
    let n = /\d+\+\+/.exec(name);
    if (n) {
        const x = parseInt(n[0]) + 1;
        return name.substring(0, n.index) + x + name.substring(n.index + n[0].length - 2);
    }
    let c = /[A-Za-zА-Яа-я]\+\+/.exec(name);
    if (c) {
        let x = c[0][0];
        if (x === 'Z' || x === 'z' || x === 'Я' || x === 'я') {
            return '';
        }
        x = String.fromCharCode(name.charCodeAt(c.index) + 1);
        return name.substring(0, c.index) + x + name.substring(c.index + 1);
    }
    return name;
}

function getPlace(p, q) {
    return Math.floor(8 + 0.5 - 4 * angle(p, q) / Math.PI) % 8;
}


export function place(nodes, edges) {
    nodes.forEach((node) => {
        node.place = Array(8).fill(0);
    })
    edges.forEach((edge) => {
        const k = getPlace(edge.start, edge.end);

        edge.start.place[k]++;
        edge.end.place[(k + 4) % 8]++;
    });
    nodes.forEach((node) => {
        let j = 0;
        const p = node.place;
        for (let i = 1; i < 8; i++) {
            if (p[i] > p[j]) {
                continue;
            }
            if (p[i] === p[j] && p[(i + 4) % 8] <= p[(j + 4) % 8]) {
                continue;
            }
            j = i;
        }
        node.place = j;
    })
}

export const ctx = writable(null);

export function setCtx(document) {
    const canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    context.font = '14px Georgia';
    ctx.set(context);
}

export function getLength(name) {
    return get(ctx)?.measureText(name).width || 10 * name.length;
}
