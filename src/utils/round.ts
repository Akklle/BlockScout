export function round(value: number, digitsAfterDecimalPoint: number) {
    return (
        Math.floor(value * 10 ** digitsAfterDecimalPoint) /
        10 ** digitsAfterDecimalPoint
    )
}
