import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styles from './index.module.sass';
import {Search} from "../../ui/Search";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import info from "../../../assets/infoSVG.svg";
import fire from "../../../assets/fire.svg";
import {Transaction, Token} from "../../../app/models/generated"
import {
    getTimeFromTimestamp,
    processedStringFromApi,
    round,
    stringTruncateFromCenter
} from "../../../services/dataProsessing";
import {
    Status,
    TypeOfTransaction
} from "../MainPage/LatestTransactionComponent/LatestTransaction";
import classNames from "classnames";
import {Icon} from "../../ui/Icon";
import ProgressBar from "../../ui/ProgressBar";
import {NavigateFunction, NavLink, useParams} from "react-router-dom"
import {baseUrl} from "../MainPage/Main";
import {initialTransaction} from "../../../app/models/generated/models/Transaction";
import {useNavigate} from 'react-router-dom';

async function getTransaction(setTransaction: Dispatch<SetStateAction<Transaction>>, number: string | undefined, navigate: NavigateFunction) {
    let url = `${baseUrl}/transactions/${number}`
    let fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        navigate('/error')
    } else {
        let result: Transaction = await fetchResult.json()
        setTransaction(result)
    }
}

async function getTokens(setTokens: Dispatch<SetStateAction<Array<Token>>>, number: string | undefined) {
    let url = `${baseUrl}/transactions/${number}/tokens`
    let result: Array<Token> = await (await fetch(url)).json()
    setTokens(result)
}

export const TransactionPage = () => {
    const navigate = useNavigate();
    const {number} = useParams()
    const [transaction, setTransactions] = useState<Transaction>(initialTransaction);
    useEffect(() => {
        getTransaction(setTransactions, number, navigate)
    }, [])
    const [tokens, setTokens] = useState<Array<Token>>([]);
    useEffect(() => {
        getTokens(setTokens, number)
    }, [])
    const isDisabled = true
    return (
        <div>
            <section className={styles.searchSection}>
                <Search/>
            </section>
            <section className={styles.pageSection}>
                <div className={styles.headOfPage}>
                    <p>Transaction details</p>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>Token transfers</Tab>
                        <Tab>Raw race</Tab>
                    </TabList>

                    <TabPanel>
                        <div className={styles.details}>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Transaction hash</p>
                                <p>{transaction.hash}</p>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Status</p>
                                <Status
                                    theme={transaction.result}>{processedStringFromApi(transaction.result)}</Status>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Block</p>
                                <a className={styles.rowLink}>
                                    <span>{transaction.block}</span>
                                </a>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Timestamp</p>
                                <p>{getTimeFromTimestamp(transaction.timestamp)}</p>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>From</p>
                                <NavLink className={classNames(styles.address, styles.fontWeight500)}
                                         to={"/transaction/" + transaction.from?.hash}>{transaction.from?.hash}</NavLink>

                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>To</p>
                                <NavLink className={classNames(styles.address, styles.fontWeight500)}
                                         to={"/transaction/" + transaction.to?.hash}>{transaction.to?.hash}</NavLink>


                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Value</p>
                                <span>0.{transaction.value === "0" ? 0 : round((Number(transaction.fee?.value) / 10 ** 18), 12)}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Transaction fee</p>
                                <span>{round((Number(transaction.fee?.value) / 10 ** 18), 12)}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Gas price</p>
                                <span>{(Number(transaction.gas_price) / 10 ** 18).toFixed(18)}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Gas limit & usage by txn</p>
                                <div className={styles.percentage}>
                                    <span>{Number(transaction.gas_limit) ? Number(transaction.gas_limit) : 0}</span>
                                    <div className={styles.verticalLine}></div>
                                    <span>{Number(transaction.gas_used) ? Number(transaction.gas_used) : 0}</span>
                                    <ProgressBar progressColor={'#3CE2EC'} bgColor={'#8D8D8E'}
                                                 progress={(Number(transaction.gas_used) / Number(transaction.gas_limit)) * 100}
                                                 width={39}
                                                 height={3}></ProgressBar>
                                    <span>{((Number(transaction.gas_used) / Number(transaction.gas_limit)) * 100).toFixed(2)}%</span>
                                </div>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Gas fees (Gwei)</p>
                                <span
                                    className={styles.mgR20}>Base: <span>{(Number(transaction.base_fee_per_gas) / 10 ** 9).toFixed(10)}</span></span>
                                <div className={styles.verticalLine}></div>
                                <span
                                    className={styles.mgR20}>Max: <span>{(Number(transaction.max_fee_per_gas) / 10 ** 9).toFixed(10)}</span></span>
                                <div className={styles.verticalLine}></div>
                                <span
                                    className={styles.mgR20}>Max priority: <span>{(Number(transaction.max_priority_fee_per_gas) / 10 ** 9).toFixed(10)}</span></span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Burnt fees</p>
                                <img className={styles.gasIcon} src={fire} alt=""/>
                                <span>{(Number(transaction.tx_burnt_fee) / 10 ** 18).toFixed(18)}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className={styles.tokenTransfers}>
                            <div className={styles.tableWrapper}>
                                <div className={styles.tableBorder}></div>
                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                    <tr>
                                        <th className={classNames(styles.thW30, styles.thDefault)}>Token</th>
                                        <th className={classNames(styles.thW30, styles.thDefault)}>Token ID</th>
                                        <th className={classNames(styles.thFrom, styles.thDefault)}>From</th>
                                        <th className={styles.thIcon}></th>
                                        <th className={styles.thTo}>To</th>
                                        <th className={classNames(styles.thW40, styles.thDefaultRight)}>Value</th>
                                    </tr>
                                    </thead>
                                    <tbody className={styles.tableBody}>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tdCell}>
                                            <div className={styles.addressGroup}>
                                                <div className={styles.angularAvatar}></div>
                                                <a className={styles.address}></a>
                                            </div>
                                            <TypeOfTransaction
                                                theme="token_transfer">{processedStringFromApi("token_transfer")}</TypeOfTransaction>
                                        </td>
                                        <td className={styles.tdCell}>
                                            <div>
                                                <a className={styles.ID}>-</a>
                                            </div>
                                        </td>
                                        <td className={styles.tdCell}>
                                            <div className={styles.addressGroup}>
                                                <div className={styles.angularAvatar}></div>
                                                <a className={styles.address}>0x75...1a90</a>
                                            </div>
                                        </td>
                                        <td className={styles.tdIconCell}>
                                            <div><Icon icon={"path"} width={24} height={6}/></div>
                                        </td>
                                        <td className={styles.tdCellW}>
                                            <div className={styles.addressGroup}>
                                                <div
                                                    className={classNames(styles.angularAvatar, styles.receiver)}></div>
                                                <a className={styles.address}>0x8C...1a9D</a>
                                            </div>
                                        </td>
                                        <td className={styles.tdCellRight} align={"right"}>{}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className={styles.traceBlock}>
                            {transaction.raw_input}
                        </div>
                    </TabPanel>
                </Tabs>
            </section>

        </div>
    )
}