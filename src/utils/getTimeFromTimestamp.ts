export function getTimeFromTimestamp(timestamp: string | undefined) {
    if (timestamp === undefined) {
        return ' '
    }
    return timestamp.substring(11, 19)
}