export function stringTruncateFromCenter(
    str: string | undefined,
    maxLength: number
) {
    if (str === undefined) {
        return '-'
    }
    const midChar = '…'
    let left, right
    if (str.length <= maxLength) return str
    left = Math.ceil(maxLength / 2)
    right = str.length - Math.floor(maxLength / 2)
    return str.substring(0, left) + midChar + str.substring(right)
}
