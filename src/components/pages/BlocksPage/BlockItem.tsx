import React from 'react'
import styles from '../BlocksPage/index.module.sass'
import classNames from 'classnames'
import ProgressBar from '../../ui/ProgressBar'

import { Block } from '../../../app/models/generated'
import { NavLink } from 'react-router-dom'
import {
    calculateReward,
    stringTruncateFromCenter,
    getTimeFromTimestamp,
    formatNumber,
} from '../../../utils'
import { Icon } from '../../ui/Icon'

interface wrapperBlock {
    block: Block
}

export const BlockItem = (props: wrapperBlock) => {
    const currentBlock = props.block

    const percentageGasUsed = currentBlock.gas_used_percentage
        ? Number(currentBlock.gas_used_percentage.toFixed(2))
        : 0
    const percentageGasTarget = currentBlock.gas_target_percentage
        ? Number(currentBlock.gas_target_percentage.toFixed(2))
        : 0
    const reward = (calculateReward(currentBlock.rewards) / 10 ** 18).toFixed(8)
    const burntFees = currentBlock.burnt_fees
        ? (currentBlock.burnt_fees / 10 ** 18).toFixed(8)
        : 0
    const burntFeesPercentage = currentBlock.burnt_fees_percentage
        ? Number(currentBlock.burnt_fees_percentage.toFixed(2))
        : 0

    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <div>
                    <NavLink
                        className={classNames(
                            styles.address,
                            styles.fontWeight500
                        )}
                        to={'/block/' + currentBlock.height}>
                        {currentBlock.height}
                    </NavLink>
                    <p className={styles.hashTime}>
                        {getTimeFromTimestamp(currentBlock.timestamp)}
                    </p>
                </div>
            </td>
            <td className={styles.tdCell}>{formatNumber(currentBlock.size)}</td>
            <td className={styles.tdCell}>
                <NavLink to={'/address/' + currentBlock.miner?.hash} className={styles.address}>
                    {stringTruncateFromCenter(currentBlock.miner?.hash, 8)}
                </NavLink>
            </td>
            <td className={styles.tdCell}>{currentBlock.tx_count}</td>
            <td className={styles.tdCell}>
                <div className={styles.gasUsedCell}>
                    <p>{formatNumber(currentBlock.gas_used)}</p>
                    <div className={styles.percentage}>
                        <ProgressBar
                            progressColor={'#3CE2EC'}
                            bgColor={'#8D8D8E'}
                            progress={percentageGasUsed}
                            width={39}
                            height={3}></ProgressBar>
                        <span>{percentageGasUsed}%</span>
                        <div className={styles.verticalLine}></div>
                        <span>{percentageGasTarget}%</span>
                    </div>
                </div>
            </td>
            <td className={styles.tdCellRight} align={'right'}>
                {reward}
            </td>
            <td className={styles.tdCellRight}>
                <div className={styles.burntFeeCell}>
                    <div className={styles.brFeeTop}>
                        <Icon icon="fire" width={20} height={20} color={"white"}/>

                        <p>{burntFees}</p>
                    </div>
                    <div className={styles.percentage}>
                        <ProgressBar
                            progressColor={'#59FFA4'}
                            bgColor={'#8D8D8E'}
                            progress={burntFeesPercentage}
                            width={39}
                            height={3}></ProgressBar>
                        <span>
                            {burntFeesPercentage}
                            %
                        </span>
                    </div>
                </div>
            </td>
        </tr>
    )
}
