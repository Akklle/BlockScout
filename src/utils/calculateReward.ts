import { Reward } from '../app/models/generated'

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
