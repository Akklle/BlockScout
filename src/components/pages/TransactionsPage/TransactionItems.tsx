import React from 'react';
import {TransactionItem} from "./TransactionItem";
import {Transaction} from '../../../app/models/generated'
import styles from "../BlocksPage/index.module.sass";
interface TransactionArrayInterface {
    TransactionArray: Array<Transaction>
}

export const TransactionItems = ({TransactionArray}: TransactionArrayInterface) => {
    return (
        <tbody className={styles.tableBody}>
        {TransactionArray.map((transaction: Transaction) => {
            return <TransactionItem key={transaction.hash}
                                    transaction={transaction}
            />
        })}
        </tbody>

    )
}