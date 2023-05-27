import {Reward} from "../app/models/generated";

export function processedStringFromApi(type: string) {
    return (type.charAt(0).toUpperCase() + type.substring(1)).replace('_', ' ')

}

export function calculateReward(rewardArray: Array<Reward> | undefined) {
    if (rewardArray === undefined) {
        return 0
    }
    let sum = 0
    rewardArray.map((reward: Reward) => {
        sum += Number(reward.reward)
    })
    return sum
}

export function stringTruncateFromCenter(str: string | undefined, maxLength: number) {
    if (str === undefined) {
        return '-'
    }
    const midChar = "…"
    let left, right
    if (str.length <= maxLength) return str
    left = Math.ceil(maxLength / 2)
    right = str.length - Math.floor(maxLength / 2)
    return str.substring(0, left) + midChar + str.substring(right)
}

export function round(value: number, digitsAfterDecimalPoint: number) {
    return Math.floor(value * 10 ** digitsAfterDecimalPoint) / 10 ** digitsAfterDecimalPoint

}

export function getTimeFromTimestamp(timestamp: string | undefined) {
    if (timestamp === undefined) {
        return ' '
    }
    return timestamp.substring(11, 19)
}

export function formatNumber(num : string | number) {
    if (typeof num == 'string') {
        return num.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    }
    else {
        return String(num).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
    }
}