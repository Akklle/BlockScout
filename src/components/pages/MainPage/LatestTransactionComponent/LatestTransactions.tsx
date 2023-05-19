import React from 'react';
import styles from './LatestTransaction.module.sass';
import {LatestTransaction} from "./LatestTransaction";
import {Transaction} from "../../../../app/models/generated";


interface LatestTransactionArrayInterface {
    LatestTransactionArray: Array<Transaction>
}

export const LatestTransactions = ({LatestTransactionArray}: LatestTransactionArrayInterface) => {
    return (
        <div className={styles.LatestBlockArr}>
            {LatestTransactionArray.map((transaction: Transaction) => {
                return <LatestTransaction key={transaction.hash}
                                          transaction={transaction}
                />
            })}
        </div>
    )
}