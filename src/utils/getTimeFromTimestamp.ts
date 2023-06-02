export function getTimeFromTimestamp(timestamp: string | undefined) {
    if (timestamp === undefined) {
        return ' '
    }
    return timestamp.substring(11, 19)
}

export function getFullTimeFromTimestamp(timestamp: string | undefined) {
    if (timestamp === undefined) {
        return ' '
    }
    return timestamp.substring(0, 10) + " " + timestamp.substring(11, 19)
}