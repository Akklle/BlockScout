import React, {ReactNode} from 'react';
import styles from './LatestTransaction.module.sass';
import tradeIcon from "../../../../assets/tradeIcon.svg";
import path from "../../../../assets/path.svg";
import line from "../../../../assets/line.svg";
import cn from 'classnames/bind'
import classNames from 'classnames'

const cx = cn.bind(styles)

export interface TypeOfTransactionProps {
    theme?: 'Token transfer' | 'Contract call' | 'Transaction' | string;
    children: ReactNode;
}

export const TypeOfTransaction = ({theme = 'Transaction', children}: TypeOfTransactionProps) => {
    return (
        <div className={cx(styles.type, {
            typeTokenTransfer: theme === 'Token transfer',
            typeContractCall: theme === 'Contract call',
            typeTransaction: theme === 'Transaction'

        })}>
            {children}
        </div>
    )
}

export interface StatusProps {
    theme?: 'Success' | 'Failed' | string;
    children: ReactNode;
}

export const Status = ({theme = 'Success', children}: StatusProps) => {
    return (
        <div className={cx(styles.status, {
            statusSuccess: theme === 'Success',
            statusFailed: theme === 'Failed'

        })}>
            {children}
        </div>
    )
}

export interface latestTransactionProps {
    type: string
    status: string
    number: string
    time: string
    address_1: string
    address_2: string
    value_type: string
    value_value: string
    fee_type: string
    fee_value: string
}


export const LatestTransaction = (props: latestTransactionProps) => {

    return (
        <div className={styles.latestTransaction}>
            <div className={styles.line}></div>
            <div className={styles.latestTransactionInfo}>
                <div className={styles.leftInfo}>
                    <div className={styles.topLeftInfo}>
                        <TypeOfTransaction theme={props.type}>{props.type}</TypeOfTransaction>
                        <Status theme={props.status}>{props.status}</Status>
                    </div>
                    <div className={styles.underLeftInfo}>
                        <img className={styles.tradeIcon} src={tradeIcon} alt="icon"/>
                        <a className={styles.number}>{props.number}</a>
                        <p className={styles.time}>{props.time}</p>
                    </div>
                </div>

                <div className={styles.rightInfo}>
                    <div className={styles.topRightInfo}>
                        <div className={styles.angularAvatar}></div>
                        <a className={styles.address}>{props.address_1}</a>
                        <img className={styles.path} src={path} alt="icon"/>
                        <div className={classNames(styles.angularAvatar, styles.receiver)}></div>
                        <a className={styles.address}>{props.address_2}</a>
                    </div>
                    <div className={styles.underRightInfo}>
                        <p className={styles.criptType}>{props.value_type}</p>
                        <p className={styles.value}>{props.value_value}</p>
                        <p className={styles.criptType}>{props.fee_type}</p>
                        <p className={styles.value}>{props.fee_value}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}