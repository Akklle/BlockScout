export function stringTruncateFromLeft(str: string | undefined, maxLength: number) {
    if (str === undefined) {
        return '-'
    }
    const midChar = "…"
    let left, right
    if (str.length <= maxLength) return str
    left = Math.ceil(24)
    right = str.length - Math.floor(4)
    return str.substring(0, left) + midChar + str.substring(right)
}