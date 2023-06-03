export function processedStringFromApi(type: string) {
    if (type === undefined) {
        return ''
    }
    return (type.charAt(0).toUpperCase() + type.substring(1)).replace('_', ' ')
}
