import React from 'react';
import styles from './LatestTransaction.module.sass';
import {LatestTransaction, latestTransactionProps} from "./LatestTransaction";


interface LatestTransactionArrayInterface {
    LatestTransactionArray: Array<latestTransactionProps>
}

export const LatestTransactions = ({LatestTransactionArray}: LatestTransactionArrayInterface) => {
    return (
        <div className={styles.LatestBlockArr}>
            {LatestTransactionArray.map((transaction: latestTransactionProps) => {
                return <LatestTransaction
                    type={transaction.type}
                    status={transaction.status}
                    number={transaction.number}
                    time={transaction.time}
                    address_1={transaction.address_1}
                    address_2={transaction.address_2}
                    value_type={transaction.value_type}
                    value_value={transaction.value_value}
                    fee_type={transaction.fee_type}
                    fee_value={transaction.fee_value}
                />
            })}
        </div>
    )
}