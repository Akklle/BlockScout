import React from 'react';
import styles from './LatestBlocks.module.sass';
import icon from "../../../../assets/LatestBlockIcon.svg";


export interface latestBlockProps {
    id: number
    date: string
    txn: string
    reward: string
    miner: string
}

export const LatestBlock = (props: latestBlockProps) => {
    return (
        <div className={styles.latestBlock}>
            <div className={styles.blockHead}>
                <div className={styles.blockHeadMain}>
                    <img className={styles.icon} src={icon} alt="icon"/>

                    <a className={styles.blockId}>
                        {props.id}
                    </a>
                </div>
                <h2 className={styles.blockDate}>
                    {props.date}
                </h2>
            </div>
            <div className={styles.underBlockInfo}>
                <div className={styles.underTypeInfo}>
                    <p className={styles.type}>Txn</p>
                    <p className={styles.type}>Reward</p>
                    <p className={styles.type}>Miner</p>
                </div>
                <div className={styles.underInfo}>
                    <p className={styles.type}>{props.txn}</p>
                    <p className={styles.type}>{props.reward}</p>
                    <p className={styles.minerValue}>{props.miner}</p>
                </div>
            </div>
        </div>
    )
}