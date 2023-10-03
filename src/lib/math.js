export function distance(p, q) {
    return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
}
export function angle(p, q) {
    return Math.atan2(q.y - p.y, q.x - p.x);
}

export function deg(p, q) {
    const a = Math.floor((angle(p, q) * 180) / Math.PI + 0.5);
    return (a + 360) % 360
}

