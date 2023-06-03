import React, { ReactNode } from 'react'
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
import {
    Status,
    TypeOfTransaction,
} from '../MainPage/LatestTransactionComponent/LatestTransaction'
import { Icon } from '../../ui/Icon'

interface wrapperTransaction {
    transaction: Transaction
}

export const TransactionItem = (props: wrapperTransaction) => {
    const currentTransaction = props.transaction
    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <div>
                    <NavLink
                        className={classNames(
                            styles.address,
                            styles.fontWeight500
                        )}
                        to={'/transaction/' + currentTransaction.hash}
                    >
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
                    <Status theme={currentTransaction.result}>
                        {processedStringFromApi(currentTransaction.result)}
                    </Status>
                </div>
            </td>
            <td className={styles.tdCell}>
                <p className={styles.method}>{currentTransaction.method}</p>
            </td>
            <td className={styles.tdCell}>
                <NavLink
                    className={classNames(styles.address, styles.fontWeight500)}
                    to={'/block/' + currentTransaction.block}
                >
                    {currentTransaction.block}
                </NavLink>
            </td>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div className={styles.angularAvatar}></div>
                    <NavLink
                        className={classNames(styles.address, styles.fontWeight500)}
                        to={'/address/' + currentTransaction.from?.hash}
                    >{stringTruncateFromCenter(
                        currentTransaction.from?.hash,
                        8
                    )}</NavLink>

                </div>
            </td>
            <td className={styles.tdIconCell}>
                <div>
                    <Icon icon={'path'} width={24} height={6} />
                </div>
            </td>
            <td className={styles.tdCellW}>
                <div className={styles.addressGroup}>
                    <div
                        className={classNames(
                            styles.angularAvatar,
                            styles.receiver
                        )}
                    ></div>
                    <a className={styles.address}>
                        {currentTransaction.to
                            ? stringTruncateFromCenter(
                                  currentTransaction.to.hash,
                                  8
                              )
                            : stringTruncateFromCenter(
                                  currentTransaction.created_contract?.hash,
                                  8
                              )}
                    </a>
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
