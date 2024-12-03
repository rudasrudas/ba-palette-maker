export default function paletteOklch (v) {
    if(v.length !== 3) return

    return {
        lightness: v[0],
        chroma: v[1],
        hue: v[2]
    }
}