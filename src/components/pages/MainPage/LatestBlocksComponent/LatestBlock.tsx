import React from 'react';
import styles from './LatestBlocks.module.sass';
import icon from "../../../../assets/LatestBlockIcon.svg";
import {Block} from "../Main";
import {Reward} from "../Main";

interface haha {
    block: Block
}

function calculateReward(rewardArray: Array<Reward>)
{
    let sum = 0
    rewardArray.map((reward: Reward) => {
        sum += Number(reward.reward)
        console.log(sum)
    })
    return sum
}
export const LatestBlock = (props: haha) => {
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
                        {currentBlock.timestamp}
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
                        <p className={styles.type}>{calculateReward(currentBlock.rewards)/10**18}</p>
                        <p className={styles.minerValue}>{currentBlock.miner.hash}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}