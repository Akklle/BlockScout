import React from 'react'
import styles from './LatestTransaction.module.sass'
import { Icon } from '../../../ui/Icon'
import classNames from 'classnames'
import { Transaction } from '../../../../app/models/generated'
import {
    getTimeFromTimestamp,
    processedStringFromApi,
    round,
    stringTruncateFromCenter,
} from '../../../../utils'
import { Status } from '../../../ui/Status'
import { TypeOfTransaction } from '../../../ui/TypeOfTransaction'
import { NavLink } from 'react-router-dom'

interface wrapperTransaction {
    transaction: Transaction
}

export const LatestTransaction = (props: wrapperTransaction) => {
    const currentTransaction = props.transaction

    currentTransaction.tx_types = currentTransaction.tx_types.length
        ? currentTransaction.tx_types
        : ['coin_transfer']

    const toAddress = currentTransaction.to
        ? currentTransaction.to.hash
        : currentTransaction.created_contract?.hash

    const value =
        currentTransaction.value === '0'
            ? 0
            : round(Number(currentTransaction.fee?.value) / 10 ** 18, 5)

    const feeValue = round(Number(currentTransaction.fee?.value) / 10 ** 18, 5)

    return (
        <div className={styles.latestTransaction}>
            <div className={styles.line}></div>
            <div className={styles.latestTransactionInfo}>
                <div className={styles.leftInfo}>
                    <div className={styles.topLeftInfo}>
                        <TypeOfTransaction
                            theme={currentTransaction.tx_types[0]}>
                            {processedStringFromApi(
                                currentTransaction.tx_types[0]
                            )}
                        </TypeOfTransaction>
                        <Status theme={currentTransaction.status}></Status>
                    </div>
                    <div className={styles.underLeftInfo}>
                        <Icon icon={'totalTransaction'} />
                        <NavLink
                            to={'/transaction/' + currentTransaction?.hash}
                            className={styles.number}>
                            {stringTruncateFromCenter(
                                currentTransaction?.hash,
                                8
                            )}
                        </NavLink>
                        <p className={styles.time}>
                            {getTimeFromTimestamp(currentTransaction.timestamp)}
                        </p>
                    </div>
                </div>

                <div className={styles.rightInfo}>
                    <div className={styles.topRightInfo}>
                        <div className={styles.angularAvatar}></div>
                        <NavLink
                            to={'/address/' + currentTransaction.from?.hash}
                            className={styles.address}>
                            {stringTruncateFromCenter(
                                currentTransaction.from?.hash,
                                8
                            )}
                        </NavLink>
                        <Icon icon={'path'} width={24} />
                        <div
                            className={classNames(
                                styles.angularAvatar,
                                styles.receiver
                            )}></div>
                        <NavLink
                            to={'/address/' + toAddress}
                            className={styles.address}>
                            {stringTruncateFromCenter(toAddress, 8)}
                        </NavLink>
                    </div>
                    <div className={styles.underRightInfo}>
                        <p className={styles.criptType}>Value ETH</p>
                        <p className={styles.value}>{value}</p>
                        <p className={styles.criptType}>Fee ETH</p>
                        <p className={styles.value}>{feeValue}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
