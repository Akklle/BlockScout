import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'
import { Search } from '../../ui/Search'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import '../../../styles/tabs.sass'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'
import classNames from 'classnames'
import { TransactionItems } from './TransactionItems'
import {
    getTransactions,
    TransactionList,
} from '../../../services/TransactionsPageService'

const previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page = 1

export const Transactions = () => {
    const [transactionList, setTransactions] = useState<TransactionList>({
        items: [],
        next_page_params: null,
    })
    const previousPageHandler = () => {
        if (previousParams.length > 0) {
            page = page - 1
            currentParams = previousParams.pop() || {}
            getTransactions(setTransactions, currentParams)
        }
    }

    const nextPageHandler = () => {
        if (transactionList.next_page_params) {
            previousParams.push(currentParams)
            currentParams = transactionList.next_page_params
            page = page + 1
            getTransactions(setTransactions, currentParams)
        }
    }
    useEffect(() => {
        getTransactions(setTransactions, {})
    }, [])
    const isDisabled = page == 1
    return (
        <div>
            <section className={styles.searchSection}>
                <Search />
            </section>
            <section className={styles.pageSection}>
                <div className={styles.headOfPage}>
                    <p>Transactions</p>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Validated</Tab>
                    </TabList>

                    <TabPanel>
                        <div className={styles.transactions}>
                            <div className={styles.paginationButtons}>
                                <button
                                    className={styles.controlButton}
                                    disabled={isDisabled}
                                    onClick={previousPageHandler}>
                                    <img src={prev} alt="previous page" />
                                </button>
                                <div className={styles.pageNum}>{page}</div>
                                <button
                                    className={styles.controlButton}
                                    onClick={nextPageHandler}
                                    disabled={
                                        !transactionList.next_page_params
                                    }>
                                    <img src={next} alt="next page" />
                                </button>
                            </div>
                            <div className={styles.tableWrapper}>
                                <div className={styles.tableBorder}></div>
                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                        <tr>
                                            <th
                                                className={classNames(
                                                    styles.th25p75,
                                                    styles.thDefault
                                                )}>
                                                Txn hash
                                            </th>
                                            <th
                                                className={classNames(
                                                    styles.thType,
                                                    styles.thDefault
                                                )}>
                                                Type
                                            </th>
                                            <th
                                                className={classNames(
                                                    styles.thW10,
                                                    styles.thDefault
                                                )}>
                                                Method
                                            </th>
                                            <th
                                                className={classNames(
                                                    styles.thBlock,
                                                    styles.thDefault
                                                )}>
                                                Block
                                            </th>
                                            <th
                                                className={classNames(
                                                    styles.thFrom,
                                                    styles.thDefault
                                                )}>
                                                From
                                            </th>
                                            <th className={styles.thIcon}></th>
                                            <th className={styles.thTo}>To</th>
                                            <th
                                                className={classNames(
                                                    styles.thW12,
                                                    styles.thDefaultRight
                                                )}>
                                                Value ETH
                                            </th>
                                            <th
                                                className={classNames(
                                                    styles.th9p75,
                                                    styles.thDefaultRight
                                                )}>
                                                Fee ETH
                                            </th>
                                        </tr>
                                    </thead>
                                    <TransactionItems
                                        TransactionArray={transactionList.items}
                                        currentLocation="TransactionsPage"></TransactionItems>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </section>
        </div>
    )
}
