import React from 'react'
import styles from '../BlocksPage/index.module.sass'
import classNames from 'classnames'
import {
    getTimeFromTimestamp,
    processedStringFromApi,
    round,
    stringTruncateFromCenter,
    stringTruncateFromLeft,
} from '../../../utils'

import { Transaction } from '../../../app/models/generated'
import { NavLink } from 'react-router-dom'
import { Icon } from '../../ui/Icon'
import { TypeOfTransaction } from '../../ui/TypeOfTransaction'
import { Status } from '../../ui/Status'

interface wrapperTransaction {
    transaction: Transaction
}

export const TransactionItem = (props: wrapperTransaction) => {
    const currentTransaction = props.transaction

    const addressTo = currentTransaction.to
        ? currentTransaction.to.hash
        : currentTransaction.created_contract?.hash
    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <div>
                    <NavLink
                        className={classNames(
                            styles.address,
                            styles.fontWeight500
                        )}
                        to={'/transaction/' + currentTransaction.hash}>
                        {stringTruncateFromLeft(currentTransaction.hash)}
                    </NavLink>
                    <p className={styles.hashTime}>
                        {getTimeFromTimestamp(currentTransaction.timestamp)}
                    </p>
                </div>
            </td>
            <td className={styles.tdCell}>
                <div className={styles.typeAndStatus}>
                    <TypeOfTransaction theme={currentTransaction.tx_types[0]}>
                        {processedStringFromApi(currentTransaction.tx_types[0])}
                    </TypeOfTransaction>
                    <Status theme={currentTransaction.status}></Status>
                </div>
            </td>
            <td className={styles.tdCell}>
                {currentTransaction.method ? <p className={styles.method}>{currentTransaction.method}</p> : ''}
            </td>
            <td className={styles.tdCell}>
                <NavLink
                    className={classNames(styles.address, styles.fontWeight500)}
                    to={'/block/' + currentTransaction.block}>
                    {currentTransaction.block}
                </NavLink>
            </td>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div className={styles.angularAvatar}></div>
                    <NavLink
                        className={styles.address}
                        to={'/address/' + currentTransaction.from?.hash}>
                        {stringTruncateFromCenter(
                            currentTransaction.from?.hash,
                            8
                        )}
                    </NavLink>
                </div>
            </td>
            <td className={styles.tdIconCell}>
                <div>
                    <Icon icon={'path'} width={24} height={6} color={'#3CE2EC'} />
                </div>
            </td>
            <td className={styles.tdCellW}>
                <div className={styles.addressGroup}>
                    <div
                        className={classNames(
                            styles.angularAvatar,
                            styles.receiver
                        )}></div>
                    <NavLink to={'/address/' + addressTo} className={styles.address}>
                        {stringTruncateFromCenter(addressTo, 8)}
                    </NavLink>
                </div>
            </td>
            <td className={styles.tdCellRight} align={'right'}>
                {currentTransaction.value === '0'
                    ? 0
                    : round(
                          Number(currentTransaction.fee?.value) / 10 ** 18,
                          5
                      )}
            </td>
            <td className={styles.tdCellRight} align={'right'}>
                {round(Number(currentTransaction.fee?.value) / 10 ** 18, 5)}
            </td>
        </tr>
    )
}
