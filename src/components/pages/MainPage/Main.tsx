import React, { useEffect, useState } from 'react'
import styles from './Main.module.sass'
import background1 from '../../../assets/background1.png'
import { LatestBlocks } from './LatestBlocksComponent/LatestBlocks'
import { LatestTransactions } from './LatestTransactionComponent/LatestTransactions'
import { Block, Transaction } from '../../../app/models/generated'
import { initialStats, Stats } from '../../../app/models/Stats'
import { Search } from '../../ui/Search'
import { Icon } from '../../ui/Icon'
import { NavLink } from 'react-router-dom'
import { formatNumber, round } from '../../../utils'
import {
    getBlocks,
    getStats,
    getTransactions,
} from '../../../services/MainPageService'

export const Main = () => {
    const [stats, setStats] = useState<Stats>(initialStats)
    useEffect(() => {
        getStats(setStats)
    }, [])

    const [blocks, setBlocks] = useState<Array<Block>>([])
    useEffect(() => {
        getBlocks(setBlocks)
    }, [])

    const [transactions, setTransactions] = useState<Array<Transaction>>([])
    useEffect(() => {
        getTransactions(setTransactions)
    }, [])

    const dailyTransactions =
        Number(stats.transactions_today) > 1000
            ? stats.transactions_today.substring(0, 3) +
              '.' +
              stats.transactions_today.substring(3, 4) +
              'K'
            : stats.transactions_today
    const averageBlockTime = (stats.average_block_time / 1000).toFixed(1)
    const gasPrices = formatNumber(round(Number(stats.gas_prices?.average), 5))

    return (
        <div className={styles.main}>
            <section className={styles.infoSection}>
                <img
                    className={styles.background1}
                    src={background1}
                    alt="background1"
                />

                <h1 className={styles.welcome}>
                    Welcome
                    <br />
                    to our explorer
                </h1>

                <h2 className={styles.transactionCount}>{dailyTransactions}</h2>
                <h3 className={styles.todayTransaction}>transactions today</h3>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <Icon icon="totalBlocks" />
                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Total blocks</p>
                            <p className={styles.cardValue}>
                                {formatNumber(stats.total_blocks)}
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <Icon icon="averageBlock" color={'white'}/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>
                                Average block time
                            </p>
                            <p className={styles.cardValue}>
                                {averageBlockTime} s
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <Icon icon="totalTransaction" />
                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>
                                Total transactions
                            </p>
                            <p className={styles.cardValue}>
                                {formatNumber(stats.total_transactions)}
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <Icon icon="wallet" />
                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Wallet addresses</p>
                            <p className={styles.cardValue}>
                                {formatNumber(stats.total_addresses)}
                            </p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <Icon icon="gas" />
                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Gas tracker </p>
                            <p className={styles.cardValue}>{gasPrices} Gwei</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.searchSection}>
                <Search />
            </section>
            <section className={styles.latestBlocksSection}>
                <div className={styles.headLatestBlocks}>
                    <div className={styles.latestBlocksInfo}>
                        <h1 className={styles.sectionName}>Latest blocks</h1>
                        <h2 className={styles.latestInfo}>
                            Network utilization:{' '}
                            {stats.network_utilization_percentage.toFixed(2)}%
                        </h2>
                    </div>

                    <NavLink className={styles.viewAllBlocks} to="/blocks">
                        View all blocks
                    </NavLink>
                </div>
                <LatestBlocks LatestBlockArray={blocks} />
            </section>
            <section className={styles.latestTransactionsSection}>
                <div className={styles.headLatestTransaction}>
                    <h1 className={styles.sectionName}>Latest transactions</h1>
                    <NavLink
                        className={styles.viewAllTransactions}
                        to="/transactions">
                        View all transactions
                    </NavLink>
                </div>
                <LatestTransactions LatestTransactionArray={transactions} />
            </section>
        </div>
    )
}
