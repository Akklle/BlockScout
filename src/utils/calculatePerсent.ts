export function calculatePercent(
    actual: string | number,
    total: string | number
) {
    return String((Number(actual) / Number(total)) * 100)
}
