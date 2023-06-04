import React from 'react'
import styles from './LatestBlocks.module.sass'
import { Icon } from '../../../ui/Icon'
import { Block } from '../../../../app/models/generated'
import { NavLink } from 'react-router-dom'
import {
    calculateReward,
    stringTruncateFromCenter,
    getTimeFromTimestamp,
} from '../../../../utils'

interface wrapperBlock {
    block: Block
}

export const LatestBlock = (props: wrapperBlock) => {
    const currentBlock = props.block

    const reward = calculateReward(currentBlock.rewards) / 10 ** 18

    return (
        <div className={styles.pop}>
            <div className={styles.latestBlock}>
                <div className={styles.blockHead}>
                    <div className={styles.blockHeadMain}>
                        <Icon icon={'totalBlocks'} />
                        <NavLink
                            to={'/block/' + currentBlock.height}>
                            {currentBlock.height}
                        </NavLink>
                    </div>
                    <h2>
                        {getTimeFromTimestamp(currentBlock.timestamp)}
                    </h2>
                </div>
                <div className={styles.underBlockInfo}>
                    <div className={styles.infoRow}>
                        <p className={styles.type}>Txn</p>
                        <p>{currentBlock.tx_count}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p className={styles.type}>Reward</p>
                        <p>{reward}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <p className={styles.type}>Miner</p>
                        <NavLink
                            to={'/address/' + currentBlock.miner?.hash}
                            className={styles.minerValue}>
                            {stringTruncateFromCenter(
                                currentBlock.miner?.hash,
                                8
                            )}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
