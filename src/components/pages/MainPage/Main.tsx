import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styles from './Main.module.sass';

import background1 from "../../../assets/background1.png";
import {LatestBlocks} from "./LatestBlocksComponent/LatestBlocks";
import {LatestTransactions} from "./LatestTransactionComponent/LatestTransactions";
import {Block} from "../../../app/models/generated"
import {Stats} from "../../../app/models/Stats"
import {Transaction} from "../../../app/models/generated"
import {initialStats} from "../../../app/models/Stats"
import {round} from "./LatestBlocksComponent/LatestBlock";
import {Search} from "../../ui/Search";
import {Icon} from "../../ui/Icon";

const baseUrl = 'https://eth-goerli.blockscout.com/api/v2'

async function getStats(setStats: Dispatch<SetStateAction<Stats>>) {
    let url = baseUrl + '/stats'
    let result: Stats = await (await fetch(url)).json()
    setStats(result)
}

async function getBlocks(setBlocks: Dispatch<SetStateAction<Array<Block>>>) {
    let url = baseUrl + '/main-page/blocks'
    let result: Array<Block> = await (await fetch(url)).json()
    setBlocks(result)
}

async function getTransactions(setTransactions: Dispatch<SetStateAction<Array<Transaction>>>) {
    let url = baseUrl + '/main-page/transactions'
    let result: Array<Transaction> = await (await fetch(url)).json()
    setTransactions(result)
}

export const Main = () => {

    const [stats, setStats] = useState<Stats>(initialStats);
    useEffect(() => {
        getStats(setStats)
    }, [])

    const [blocks, setBlocks] = useState<Array<Block>>([]);
    useEffect(() => {
        getBlocks(setBlocks)
    }, [])

    const [transactions, setTransactions] = useState<Array<Transaction>>([]);
    useEffect(() => {
        getTransactions(setTransactions)
    }, [])

    return (
        <div className={styles.main}>
            <section className={styles.infoSection}>
                <img className={styles.background1} src={background1} alt="background1"/>

                <h1 className={styles.welcome}>Welcome<br/>to our explorer</h1>

                <h2 className={styles.transactionCount}>{Number(stats.transactions_today) > 1000 ? (stats.transactions_today).substring(0, 3) + '.' + (stats.transactions_today).substring(3, 4) + 'K' : stats.transactions_today}</h2>
                <h3 className={styles.todayTransaction}>transactions today</h3>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <Icon icon="totalBlocks"/>
                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Total blocks</p>
                            <p className={styles.cardValue}>{stats.total_blocks.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</p>
                        </div>

                    </div>
                    <div className={styles.card}>
                        <Icon icon="averageBlock"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Average block time</p>
                            <p className={styles.cardValue}>{(stats.average_block_time / 1000).toFixed(1)} s</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <Icon icon="totalTransaction"/>
                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Total transactions</p>
                            <p className={styles.cardValue}>{stats.total_transactions.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <Icon icon="wallet"/>
                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Wallet addresses</p>
                            <p className={styles.cardValue}>{stats.total_addresses.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <Icon icon="gas"/>
                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Gas tracker </p>
                            <p className={styles.cardValue}>{round(Number(stats.gas_prices?.average), 5) > 1000 ? String(round(Number(stats.gas_prices?.average), 5)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ') : round(Number(stats.gas_prices?.average), 5)} Gwei</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.searchSection}>
                <Search/>
            </section>
            <section className={styles.latestBlocksSection}>
                <div className={styles.headLatestBlocks}>
                    <div className={styles.latestBlocksInfo}>
                        <h1 className={styles.sectionName}>Latest blocks</h1>
                        <h2 className={styles.latestInfo}>Network
                            utilization: {stats.network_utilization_percentage.toFixed(2)}%</h2>
                    </div>
                    <button className={styles.viewAllBlocks}>View all blocks</button>
                </div>
                <LatestBlocks LatestBlockArray={blocks}/>
            </section>

            <section className={styles.latestTransactionsSection}>
                <div className={styles.headLatestTransaction}>
                    <h1 className={styles.sectionName}>Latest transactions</h1>
                    <button className={styles.viewAllTransactions}>View all transactions</button>
                </div>
                <LatestTransactions LatestTransactionArray={transactions}/>

            </section>
        </div>
    );
};
