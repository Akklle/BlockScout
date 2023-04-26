import React from 'react';
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

const BlocksArray = [
    {id: 8745734, date: '20:20:20', txn: '234', reward: '0.0341635261', miner: '0x8C...1a9D'},
    {id: 8745734, date: '20:20:20', txn: '234', reward: '0.0341635261', miner: '0x8C...1a9D'},
    {id: 8745734, date: '20:20:20', txn: '234', reward: '0.0341635261', miner: '0x8C...1a9D'},
    {id: 8745734, date: '20:20:20', txn: '234', reward: '0.0341635261', miner: '0x8C...1a9D'}]

const TransactionsArray = [
    {type: 'Token transfer', status: 'Success', number: '0xF1...82c2', time: '20:10:20', address_1: '0x8C...1a9D', address_2: '0x75...1a90', value_type:'Value ETH', value_value:'0.1234', fee_type:'Fee ETH', fee_value:'0.2134'},
    {type: 'Token transfer', status: 'Success', number: '0xF1...82c2', time: '20:10:20', address_1: '0x8C...1a9D', address_2: '0x75...1a90', value_type:'Value ETH', value_value:'0.1234', fee_type:'Fee ETH', fee_value:'0.2134'},
    {type: 'Token transfer', status: 'Success', number: '0xF1...82c2', time: '20:10:20', address_1: '0x8C...1a9D', address_2: '0x75...1a90', value_type:'Value ETH', value_value:'0.1234', fee_type:'Fee ETH', fee_value:'0.2134'},
    {type: 'Token transfer', status: 'Success', number: '0xF1...82c2', time: '20:10:20', address_1: '0x8C...1a9D', address_2: '0x75...1a90', value_type:'Value ETH', value_value:'0.1234', fee_type:'Fee ETH', fee_value:'0.2134'},
    {type: 'Token transfer', status: 'Success', number: '0xF1...82c2', time: '20:10:20', address_1: '0x8C...1a9D', address_2: '0x75...1a90', value_type:'Value ETH', value_value:'0.1234', fee_type:'Fee ETH', fee_value:'0.2134'},
    {type: 'Token transfer', status: 'Success', number: '0xF1...82c2', time: '20:10:20', address_1: '0x8C...1a9D', address_2: '0x75...1a90', value_type:'Value ETH', value_value:'0.1234', fee_type:'Fee ETH', fee_value:'0.2134'}]


export const Main = () => {
    return (
        <div className={styles.main}>
            <section className={styles.infoSection}>
                <img className={styles.background1} src={background1} alt="background1"/>

                <h1 className={styles.welcome}>Welcome<br />to our explorer</h1>

                <h2 className={styles.transactionCount}>408.5K</h2>
                <h3 className={styles.todayTransaction}>transactions today</h3>

                <div className={styles.cards}>
                    <button className={styles.card}>
                        <img className={styles.icon} src={totalBlocks} alt="totalBlocks"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Total blocks</p>
                            <p className={styles.cardValue}>8 750 564</p>
                        </div>

                    </button>
                    <button className={styles.card}>
                        <img className={styles.icon} src={averageBlock} alt="averageBlock"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Average block time</p>
                            <p className={styles.cardValue}>15.3 s</p>
                        </div>
                    </button>
                    <button className={styles.card}>
                        <img className={styles.icon} src={totalTransaction} alt="totalTransaction"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Total transactions</p>
                            <p className={styles.cardValue}>176 751 001</p>
                        </div>
                    </button>
                    <button className={styles.card}>
                        <img className={styles.icon} src={wallet} alt="wallet"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Wallet addresses</p>
                            <p className={styles.cardValue}>26 142 484</p>
                        </div>
                    </button>
                    <button className={styles.card}>
                        <img className={styles.icon} src={gas} alt="gas"/>

                        <div className={styles.cardInfo}>
                            <p className={styles.cardName}>Gas tracker </p>
                            <p className={styles.cardValue}>71,79 Gwei</p>
                        </div>
                    </button>
                        </div>
            </section>
            <section className={styles.searchSection}>
                <div className={styles.searchBlock}>
                    <input className={styles.input} type="text" placeholder="Search by address / txn hash / block / token..."/>
                    <button className={styles.search}>
                        <img className={styles.searchIcon} src={search} alt="wallet"/>
                    </button>
                </div>
            </section>
            <section className={styles.latestBlocksSection}>
                <div className={styles.headLatestBlocks}>
                    <div className={styles.latestBlocksInfo}>
                        <h1 className={styles.sectionName}>Latest blocks</h1>
                        <h2 className={styles.latestInfo}>Network utilization: 44.64%</h2>
                    </div>
                    <button className={styles.viewAllBlocks}>View all blocks</button>
                </div>
                <LatestBlocks LatestBlockArray={BlocksArray}/>
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
