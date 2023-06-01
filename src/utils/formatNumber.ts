export function formatNumber(num: string | number) {
    if (typeof num == 'string') {
        return num.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    } else {
        return String(num).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    }
}