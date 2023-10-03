const colors = ['black', 'green', 'red', 'blue', 'indigo', 'violet', 'orange'];

export function getColor(color) {
    return colors[color % colors.length];
}