export function stringTruncateFromLeft(
    str: string | undefined
) {
    if (str === undefined) {
        return '-'
    }
    const midChar = '…'
    let left, right
    left = Math.ceil(24)
    right = str.length - Math.floor(4)
    return str.substring(0, left) + midChar + str.substring(right)
}
