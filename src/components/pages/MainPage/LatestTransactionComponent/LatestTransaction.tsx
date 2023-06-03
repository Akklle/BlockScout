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

interface wrapperTransaction {
    transaction: Transaction
}

export const LatestTransaction = (props: wrapperTransaction) => {
    const currentTransaction = props.transaction

    currentTransaction.tx_types = currentTransaction.tx_types.length
        ? currentTransaction.tx_types
        : ['coin_transfer']

    const toAddress = currentTransaction.to
        ? stringTruncateFromCenter(currentTransaction.to.hash, 8)
        : stringTruncateFromCenter(currentTransaction.created_contract?.hash, 8)

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
                        <a className={styles.number}>
                            {stringTruncateFromCenter(
                                currentTransaction?.hash,
                                8
                            )}
                        </a>
                        <p className={styles.time}>
                            {getTimeFromTimestamp(currentTransaction.timestamp)}
                        </p>
                    </div>
                </div>

                <div className={styles.rightInfo}>
                    <div className={styles.topRightInfo}>
                        <div className={styles.angularAvatar}></div>
                        <a className={styles.address}>
                            {stringTruncateFromCenter(
                                currentTransaction.from?.hash,
                                8
                            )}
                        </a>
                        <Icon icon={'path'} width={24} />
                        <div
                            className={classNames(
                                styles.angularAvatar,
                                styles.receiver
                            )}></div>
                        <a className={styles.address}>{toAddress}</a>
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
