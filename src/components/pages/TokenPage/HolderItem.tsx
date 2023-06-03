import React from 'react'
import styles from './index.module.sass'
import classNames from 'classnames'
import { Holder } from '../../../app/models/generated'
import ProgressBar from '../../ui/ProgressBar'
import { calculatePercent, formatNumber, round } from '../../../utils'

interface wrapperHolder {
    holder: Holder
}

export const HolderItem = (props: wrapperHolder) => {
    const currentHolder = props.holder
    const percentage = Number(
        calculatePercent(currentHolder.value, currentHolder.token.total_supply)
    )
    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div
                        className={classNames(
                            styles.angularAvatar,
                            styles.receiver
                        )}></div>
                    <a className={styles.address}>
                        {currentHolder.address.hash}
                    </a>
                </div>
            </td>

            <td className={styles.tdCellRight} align={'right'}>
                {formatNumber(
                    round(
                        Number(currentHolder.value) /
                            10 ** Number(currentHolder.token.decimals),
                        6
                    )
                )}
            </td>
            <td className={classNames(styles.tdCellRight, styles.flexEnd)}>
                <div className={styles.percentage}>
                    <ProgressBar
                        progressColor={'#59FFA4'}
                        bgColor={'#8D8D8E'}
                        progress={percentage}
                        width={39}
                        height={3}></ProgressBar>
                    <span>{round(percentage, 2)}%</span>
                </div>
            </td>
        </tr>
    )
}
