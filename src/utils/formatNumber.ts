export function formatNumber(num: string | number | bigint) {
    if (num >= 1000) {
        if (typeof num == 'string' || typeof num == 'number') {
            const tempNumber = String(num)
            const index = tempNumber.indexOf('.')
            if (index != -1) {
                const intPart = tempNumber.substring(0, index)
                const fraction = tempNumber.substring(index)
                return (
                    intPart.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ') +
                    fraction
                )
            } else {
                return tempNumber.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
            }
        } else {
            return String(num).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
        }
    } else {
        return String(num)
    }
}
