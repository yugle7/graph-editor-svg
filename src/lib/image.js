import { get, writable } from "svelte/store";

export const image = writable(null);

export const download = writable(false);
export const upload = writable(false);

const style = "<defs><style>text {font-family: Georgia, 'Times New Roman', Times, serif;font-style: italic;}</style></defs>";

export function getImage() {
    const data = get(image).outerHTML;
    const i = data.indexOf('>') + 1;
    const text = data.substring(0, i) + style + data.substring(i);
    return new Blob([text], { type: 'text/plain' });
}