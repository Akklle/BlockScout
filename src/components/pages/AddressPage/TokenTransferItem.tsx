import { TokenTransfer } from '../../../app/models/generated'
import styles from './index.module.sass'
import { Icon } from '../../ui/Icon'
import classNames from 'classnames'
import React from 'react'
import {
    formatNumber,
    getFullTimeFromTimestamp, processedStringFromApi,
    round,
    stringTruncateFromCenter, stringTruncateFromLeft,
} from '../../../utils'
import { TypeOfTransaction } from '../MainPage/LatestTransactionComponent/LatestTransaction'
import { NavLink } from 'react-router-dom'

interface wrapperTokenTransfer {
    tokenTransfer: TokenTransfer
}

export const TokenTransferItem = (props: wrapperTokenTransfer) => {
    const currentTokenTransfer = props.tokenTransfer
    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div className={styles.angularAvatar}></div>
                    <NavLink
                        className={classNames(
                            styles.address,
                            styles.fontWeight500,
                        )}
                        to={'/token/' + currentTokenTransfer.token.address}
                    >
                        {stringTruncateFromLeft(currentTokenTransfer.token.address)}
                    </NavLink>
                </div>
                <div className={styles.tokent}>
                    <p className={styles.method}>{currentTokenTransfer.method}</p>
                    <TypeOfTransaction theme={currentTokenTransfer.type}>
                        {processedStringFromApi(currentTokenTransfer.type)}
                    </TypeOfTransaction>
                </div>
            </td>
            <td className={styles.tdCell}>
                <div>
                    <a className={styles.ID}>-</a>
                </div>
            </td>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div className={styles.angularAvatar}></div>
                    <a className={styles.address}>{stringTruncateFromLeft(currentTokenTransfer.from?.hash)}</a>
                </div>
            </td>
            <td className={styles.tdIconCell}>
                <div><Icon icon={'path'} width={24} height={6} /></div>
            </td>
            <td className={styles.tdCellW}>
                <div className={styles.addressGroup}>
                    <div
                        className={classNames(styles.angularAvatar, styles.receiver)}></div>
                    <a className={styles.address}>{stringTruncateFromLeft(currentTokenTransfer.to?.hash)}</a>
                </div>
            </td>
            <td className={styles.tdCellRight}
                align={'right'}>{currentTokenTransfer.total.decimals ? (formatNumber(round(Number(currentTokenTransfer.total.value) / 10 ** Number(currentTokenTransfer.total.decimals), 8))) : '-'}</td>
        </tr>
    )
}
