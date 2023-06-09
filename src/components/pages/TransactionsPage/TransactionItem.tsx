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
import { Status } from '../../ui/Status'
import { TypeOfTransaction } from '../../ui/TypeOfTransaction'

interface wrapperTransaction {
    transaction: Transaction
    currentLocation: string
}

export const TransactionItem = (props: wrapperTransaction) => {
    const currentTransaction = props.transaction
    const blockFlag = props.currentLocation

    const addressTo = currentTransaction.to
        ? currentTransaction.to.hash
        : currentTransaction.created_contract?.hash
    const value =
        currentTransaction.value === '0'
            ? 0
            : round(Number(currentTransaction.value) / 10 ** 18, 5)
    const fee = round(Number(currentTransaction.tx_burnt_fee) / 10 ** 18, 5)
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
                        {currentTransaction.timestamp
                            ? getTimeFromTimestamp(currentTransaction.timestamp)
                            : ''}
                    </p>
                </div>
            </td>
            <td className={styles.tdCell}>
                <div className={styles.typeAndStatus}>
                    {' '}
                    {currentTransaction.tx_types[0] ? (
                        <TypeOfTransaction
                            theme={currentTransaction.tx_types[0]}>
                            {processedStringFromApi(
                                currentTransaction.tx_types[0]
                            )}
                        </TypeOfTransaction>
                    ) : (
                        <TypeOfTransaction>Transaction</TypeOfTransaction>
                    )}
                    <Status theme={currentTransaction.status}></Status>
                </div>
            </td>
            <td className={styles.tdCell}>
                {currentTransaction.method ? (
                    <p className={styles.method}>{currentTransaction.method}</p>
                ) : (
                    ''
                )}
            </td>
            {blockFlag == 'TransactionsPage' && <td className={styles.tdCell}>
                <NavLink
                    className={classNames(styles.address, styles.fontWeight500)}
                    to={'/block/' + currentTransaction.block}>
                    {currentTransaction.block}
                </NavLink>
            </td>}
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
                    <NavLink to={'/address/' + addressTo} className={styles.address}>{stringTruncateFromCenter(addressTo, 8)}</NavLink>
                </div>
            </td>
            <td className={styles.tdCellRight} align={'right'}>
                {value}
            </td>
            <td className={styles.tdCellRight} align={'right'}>
                {fee}
            </td>
        </tr>
    )
}
