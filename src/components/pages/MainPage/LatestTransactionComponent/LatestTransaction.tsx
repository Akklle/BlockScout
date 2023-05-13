import React, {ReactNode} from 'react';
import styles from './LatestTransaction.module.sass';
import tradeIcon from "../../../../assets/tradeIcon.svg";
import path from "../../../../assets/path.svg";
import cn from 'classnames/bind'
import classNames from 'classnames'
import {Transaction} from "../../../../app/models/generated";
import {getTimeFromTimestamp, round, stringTruncateFromCenter} from "../LatestBlocksComponent/LatestBlock";

const cx = cn.bind(styles)

export interface TypeOfTransactionProps {
    theme?: 'token_transfer' | 'contract_call' | 'transaction' | 'coin_transfer' | string;
    children: ReactNode;
}

export const TypeOfTransaction = ({theme = 'Transaction', children}: TypeOfTransactionProps) => {
    return (
        <div className={cx(styles.type, {
            typeTokenTransfer: theme === 'token_transfer',
            typeContractCall: theme === 'contract_call',
            typeTransaction: theme === 'transaction',
            typeCoinTransfer: theme === 'coin_transfer'

        })}>
            {children}
        </div>
    )
}

export interface StatusProps {
    theme?: 'success' | 'failed' | string;
    children: ReactNode;
}

export const Status = ({theme = 'success', children}: StatusProps) => {
    return (
        <div className={cx(styles.status, {
            statusSuccess: theme === 'success',
            statusFailed: theme === 'failed'

        })}>
            {children}
        </div>
    )
}

function processedStringFromApi(type: string) {
    return (type.charAt(0).toUpperCase() + type.substring(1)).replace('_', ' ')

}

interface wrapperTransaction {
    transaction: Transaction
}


export const LatestTransaction = (props: wrapperTransaction) => {
    let currentTransaction = props.transaction
    currentTransaction.tx_types = currentTransaction.tx_types.length ? currentTransaction.tx_types : ["coin_transfer"]
    return (
        <div className={styles.latestTransaction}>
            <div className={styles.line}></div>
            <div className={styles.latestTransactionInfo}>
                <div className={styles.leftInfo}>
                    <div className={styles.topLeftInfo}>
                        <TypeOfTransaction
                            theme={currentTransaction.tx_types[0]}>{processedStringFromApi(currentTransaction.tx_types[0])}</TypeOfTransaction>
                        <Status
                            theme={currentTransaction.result}>{processedStringFromApi(currentTransaction.result)}</Status>
                    </div>
                    <div className={styles.underLeftInfo}>
                        <img className={styles.tradeIcon} src={tradeIcon} alt="icon"/>
                        <a className={styles.number}>{stringTruncateFromCenter(currentTransaction?.hash, 8)}</a>
                        <p className={styles.time}>{getTimeFromTimestamp(currentTransaction.timestamp)}</p>
                    </div>
                </div>

                <div className={styles.rightInfo}>
                    <div className={styles.topRightInfo}>
                        <div className={styles.angularAvatar}></div>
                        <a className={styles.address}>{stringTruncateFromCenter(currentTransaction.from.hash, 8)}</a>
                        <img className={styles.path} src={path} alt="icon"/>
                        <div className={classNames(styles.angularAvatar, styles.receiver)}></div>
                        <a className={styles.address}>{currentTransaction.to ? stringTruncateFromCenter(currentTransaction.to.hash, 8) : stringTruncateFromCenter(currentTransaction.created_contract?.hash, 8)}</a>
                    </div>
                    <div className={styles.underRightInfo}>
                        <p className={styles.criptType}>Value ETH</p>
                        <p className={styles.value}>{currentTransaction.value === "0" ? 0 : round((Number(currentTransaction.fee.value) / 10 ** 18), 5)}</p>
                        <p className={styles.criptType}>Fee ETH</p>
                        <p className={styles.value}>{round((Number(currentTransaction.fee.value) / 10 ** 18), 5)}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}