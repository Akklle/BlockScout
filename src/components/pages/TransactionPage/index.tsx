import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styles from './index.module.sass';
import {Search} from "../../ui/Search";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import info from "../../../assets/infoSVG.svg";
import fire from "../../../assets/fire.svg";
import prev from "../../../assets/arrow_prev.svg";
import next from "../../../assets/arrow_next.svg";
import {processedStringFromApi, getTimeFromTimestamp, round} from "../../../utils";

import {Transaction, TokenTransfer} from "../../../app/models/generated"
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
import {TokenTransferItems} from "./TokenTransferItems";

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

type TokenTransferList = {
    items: Array<TokenTransfer>,
    next_page_params: Record<string, string> | null
}

async function getTokenTransfers(setTokenTransfers: Dispatch<SetStateAction<TokenTransferList>>, address: string | undefined, params: Record<string, string>) {
    let url = baseUrl + '/transactions/' + address + '/token-transfers?'
    let searchParams = new URLSearchParams(params);

    let result: TokenTransferList = await (await fetch(url + searchParams.toString())).json()
    setTokenTransfers(result)
}

let previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page: number = 1

export const TransactionPage = () => {
    const navigate = useNavigate();
    const {number} = useParams()
    const {address} = useParams()

    const [transaction, setTransactions] = useState<Transaction>(initialTransaction);
    const [tokenTransfers, setTokenTransfers] = useState<TokenTransferList>({items: [], next_page_params: null});

    useEffect(() => {
        getTransaction(setTransactions, number, navigate)
    }, [])

    useEffect(() => {
        getTokenTransfers(setTokenTransfers, address, {})
    }, [])

    const isDisabled = page == 1

    const previousPageHandler = () => {
        if (previousParams.length > 0) {
            page = page - 1
            currentParams = previousParams.pop() || {}
            getTokenTransfers(setTokenTransfers, address, currentParams)
        }
    }
    const nextPageHandler = () => {
        if (tokenTransfers.next_page_params) {
            previousParams.push(currentParams)
            currentParams = tokenTransfers.next_page_params
            page = page + 1
            getTokenTransfers(setTokenTransfers, address, currentParams)
        }
    }

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
                            <div className={styles.paginationButtons}>
                                <button className={styles.controlButton} disabled={isDisabled}
                                        onClick={previousPageHandler}><img src={prev}
                                                                           alt="previous page"/>
                                </button>
                                <div className={styles.pageNum}>{page}</div>
                                <button className={styles.controlButton} onClick={nextPageHandler}><img src={next}
                                                                                                        alt="next page"/>
                                </button>
                            </div>
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
                                    <TokenTransferItems TokenTransferArray={tokenTransfers.items}></TokenTransferItems>

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