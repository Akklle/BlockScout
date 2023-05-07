import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styles from './Main.module.sass';

import background1 from "../../../assets/background1.png";
import totalBlocks from "../../../assets/totalBlocks.svg";
import averageBlock from "../../../assets/averageBlock.svg";
import totalTransaction from "../../../assets/totalTransaction.svg";
import wallet from "../../../assets/wallet.svg";
import gas from "../../../assets/gas.svg";
import search from "../../../assets/search.svg";
import {LatestBlocks} from "./LatestBlocksComponent/LatestBlocks";
import {LatestTransactions} from "./LatestTransactionComponent/LatestTransactions";

// import { Button, Input } from 'components/ui';

const baseUrl = 'https://eth-goerli.blockscout.com/api/v2'

const BlocksArray = [
    {id: 8745734, date: '20:20:20', txn: '234', reward: '0.0341635261', miner: '0x8C...1a9D'},
    {id: 8745735, date: '20:20:20', txn: '234', reward: '0.0341635261', miner: '0x8C...1a9D'},
    {id: 8745736, date: '20:20:20', txn: '234', reward: '0.0341635261', miner: '0x8C...1a9D'},
    {id: 8745737, date: '20:20:20', txn: '234', reward: '0.0341635261', miner: '0x8C...1a9D'},
    {id: 8745738, date: '20:20:20', txn: '234', reward: '0.0341635261', miner: '0x8C...1a9D'}]

const TransactionsArray = [
    {
        type: 'Contract call',
        status: 'Success',
        number: '0xF1...82c2',
        time: '20:10:20',
        address_1: '0x8C...1a9D',
        address_2: '0x75...1a90',
        value_type: 'Value ETH',
        value_value: '0.1234',
        fee_type: 'Fee ETH',
        fee_value: '0.2134'
    },
    {
        type: 'Token transfer',
        status: 'Failed',
        number: '0xF1...82c3',
        time: '20:10:20',
        address_1: '0x8C...1a9D',
        address_2: '0x75...1a90',
        value_type: 'Value ETH',
        value_value: '0.1234',
        fee_type: 'Fee ETH',
        fee_value: '0.2134'
    },
    {
        type: 'Transaction',
        status: 'Success',
        number: '0xF1...82c4',
        time: '20:10:20',
        address_1: '0x8C...1a9D',
        address_2: '0x75...1a90',
        value_type: 'Value ETH',
        value_value: '0.1234',
        fee_type: 'Fee ETH',
        fee_value: '0.2134'
    },
    {
        type: 'Token transfer',
        status: 'Failed',
        number: '0xF1...82c5',
        time: '20:10:20',
        address_1: '0x8C...1a9D',
        address_2: '0x75...1a90',
        value_type: 'Value ETH',
        value_value: '0.1234',
        fee_type: 'Fee ETH',
        fee_value: '0.2134'
    },
    {
        type: 'Token transfer',
        status: 'Success',
        number: '0xF1...82c6',
        time: '20:10:20',
        address_1: '0x8C...1a9D',
        address_2: '0x75...1a90',
        value_type: 'Value ETH',
        value_value: '0.1234',
        fee_type: 'Fee ETH',
        fee_value: '0.2134'
    },
    {
        type: 'Token transfer',
        status: 'Success',
        number: '0xF1...82c7',
        time: '20:10:20',
        address_1: '0x8C...1a9D',
        address_2: '0x75...1a90',
        value_type: 'Value ETH',
        value_value: '0.1234',
        fee_type: 'Fee ETH',
        fee_value: '0.2134'
    }]

interface GasPrices {
    average: number,
    fast: number,
    slow: number
}

interface Stats {
    average_block_time: number,
    "total_blocks": string,
    "total_addresses": string,
    "total_transactions": string,
    "coin_price": string,
    "total_gas_used": string,
    "transactions_today": string,
    "gas_used_today": string,
    "gas_prices": GasPrices | null,
    "static_gas_price": string,
    "market_cap": string,
    "network_utilization_percentage": number
}

async function getStats(setStats: Dispatch<SetStateAction<Stats>>) {
    let url = baseUrl + '/stats'
    let result: Stats = await (await fetch(url)).json()
    setStats(result)
}
interface WatchListName {
    "display_name": string,
    "label": string
}
interface Tag {
    "address_hash": string,
    "display_name": string,
    "label": string
}
interface Address {
    "hash": string,
    "implementation_name": string,
    "name": string,
    "is_contract": boolean,
    "private_tags": Array<Tag>,
    "watchlist_names": Array<WatchListName>,
    "public_tags": Array<Tag>,
    "is_verified": boolean
}
export interface Reward {
    "reward": number,
    "type": string
}

export interface Block {
    "height": number,
    "timestamp": string,
    "tx_count": number,
    "miner": Address,
    "size": number,
    "hash": string,
    "parent_hash": string,
    "difficulty": string,
    "total_difficulty": string,
    "gas_used": number,
    "gas_limit": number,
    "nonce": string,
    "base_fee_per_gas": number,
    "burnt_fees": number,
    "priority_fee": number,
    "extra_data": string,
    "uncles_hashes": Array<string>,
    "state_root": string,
    "rewards": Array<Reward>,
    "gas_target_percentage": number,
    "gas_used_percentage": number,
    "burnt_fees_percentage": number,
    "type": string,
    "tx_fees": number
}

async function getBlocks(setBlocks: Dispatch<SetStateAction<Array<Block>>>) {
    let url = baseUrl + '/main-page/blocks'
    let result: Array<Block> = await (await fetch(url)).json()
    setBlocks(result)
}


export const Main = () => {
    let f: Stats = {
        average_block_time: -1,
        "total_blocks": '',
        "total_addresses": '',
        "total_transactions": '',
        "coin_price": '',
        "total_gas_used": '',
        "transactions_today": '',
        "gas_used_today": '',
        "gas_prices": null,
        "static_gas_price": '',
        "market_cap": '',
        "network_utilization_percentage": -1
    };

    const [stats, setStats] = useState<Stats>(f);
    useEffect(() => {
        getStats(setStats)
    }, [])
    const [blocks, setBlocks] = useState<Array<Block>>([]);
    useEffect(() => {
        getBlocks(setBlocks)
    }, [])
    return (
        <div className={styles.main}>
            <section className={styles.infoSection}>
                <img className={styles.background1} src={background1} alt="background1"/>

                <h1 className={styles.welcome}>Welcome<br/>to our explorer</h1>

                <h2 className={styles.transactionCount}>{(stats.transactions_today).substring(0, 3) + '.' + (stats.transactions_today).substring(3, 4)}K</h2>
                <h3 className={styles.todayTransaction}>transactions today</h3>

                <div className={styles.cards}>
                    <div className={styles.card}>
                        <img className={styles.icon} src={totalBlocks} alt="totalBlocks"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Total blocks</p>
                            <p className={styles.cardValue}>{stats.total_blocks.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</p>
                        </div>

                    </div>
                    <div className={styles.card}>
                        <img className={styles.icon} src={averageBlock} alt="averageBlock"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Average block time</p>
                            <p className={styles.cardValue}>{(stats.average_block_time/1000).toFixed(1)} s</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img className={styles.icon} src={totalTransaction} alt="totalTransaction"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Total transactions</p>
                            <p className={styles.cardValue}>{stats.total_transactions.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img className={styles.icon} src={wallet} alt="wallet"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Wallet addresses</p>
                            <p className={styles.cardValue}>{stats.total_addresses.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img className={styles.icon} src={gas} alt="gas"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Gas tracker </p>
                            <p className={styles.cardValue}>{String(stats.gas_prices?.average).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')} Gwei</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.searchSection}>
                <div className={styles.searchBlock}>
                    <input className={styles.input} type="text"
                           placeholder="Search by address / txn hash / block / token..."/>
                    <button className={styles.search}>
                        <img className={styles.searchIcon} src={search} alt="wallet"/>
                    </button>
                </div>
            </section>
            <section className={styles.latestBlocksSection}>
                <div className={styles.headLatestBlocks}>
                    <div className={styles.latestBlocksInfo}>
                        <h1 className={styles.sectionName}>Latest blocks</h1>
                        <h2 className={styles.latestInfo}>Network utilization: {stats.network_utilization_percentage.toFixed(2)}%</h2>
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
                <LatestTransactions LatestTransactionArray={TransactionsArray}/>

            </section>
        </div>
    );
};
