import React from 'react';
import styles from './LatestBlocks.module.sass';
import icon from "../../../../assets/LatestBlockIcon.svg";
import {Block} from '../../../../app/models/generated'
import {Reward} from '../../../../app/models/generated'


function calculateReward(rewardArray: Array<Reward> | undefined) {
    if (rewardArray === undefined) {
        return 0
    }
    let sum = 0
    rewardArray.map((reward: Reward) => {
        sum += Number(reward.reward)
    })
    return sum
}

export function stringTruncateFromCenter(str: string, maxLength: number) {
    const midChar = "…"
    let left, right
    if (str.length <= maxLength) return str
    left = Math.ceil(maxLength / 2)
    right = str.length - Math.floor(maxLength / 2)
    return str.substring(0, left) + midChar + str.substring(right)
}

export function getTimeFromTimestamp(timestamp: string | undefined) {
    if (timestamp === undefined) {
        return ' '
    }
    return timestamp.substring(11, 19)
}

interface wrapperBlock {
    block: Block
}

export const LatestBlock = (props: wrapperBlock) => {
    let currentBlock = props.block
    return (
        <div className={styles.pop}>
            <div className={styles.latestBlock}>
                <div className={styles.blockHead}>
                    <div className={styles.blockHeadMain}>
                        <img className={styles.icon} src={icon} alt="icon"/>

                        <a className={styles.blockId}>
                            {currentBlock.height}
                        </a>
                    </div>
                    <h2 className={styles.blockDate}>
                        {getTimeFromTimestamp(currentBlock.timestamp)}
                    </h2>
                </div>
                <div className={styles.underBlockInfo}>
                    <div className={styles.underTypeInfo}>
                        <p className={styles.type}>Txn</p>
                        <p className={styles.type}>Reward</p>
                        <p className={styles.type}>Miner</p>
                    </div>
                    <div className={styles.underInfo}>
                        <p className={styles.type}>{currentBlock.tx_count}</p>
                        <p className={styles.type}>{calculateReward(currentBlock.rewards) / 10 ** 18}</p>
                        <p className={styles.minerValue}>{stringTruncateFromCenter(currentBlock.miner.hash, 8)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}