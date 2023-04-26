import React from 'react';
import styles from './LatestTransaction.module.sass';
import tradeIcon from "../../../../assets/tradeIcon.svg";
import path from "../../../../assets/path.svg";
import line from "../../../../assets/line.svg";


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
            <img className={styles.line} src={line} alt="line"/>
            <div className={styles.latestTransactionInfo}>
                <div className={styles.leftInfo}>
                    <div className={styles.topLeftInfo}>
                        <p className={styles.type}>{props.type}</p>
                        <p className={styles.status}>{props.status}</p>
                    </div>
                    <div className={styles.underLeftInfo}>
                        <img className={styles.tradeIcon} src={tradeIcon} alt="icon"/>
                        <a className={styles.number}>{props.number}</a>
                        <p className={styles.time}>{props.time}</p>
                    </div>
                </div>

                <div className={styles.rightInfo}>
                    <div className={styles.topRightInfo}>
                        <a className={styles.address}>{props.address_1}</a>
                        <img className={styles.path} src={path} alt="icon"/>
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