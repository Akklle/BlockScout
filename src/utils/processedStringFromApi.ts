export function processedStringFromApi(type: string) {
    return (type.charAt(0).toUpperCase() + type.substring(1)).replace('_', ' ')

}