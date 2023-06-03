import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './index.module.sass'
import '../BlockPage/tabs.sass'
import { Search } from '../../ui/Search'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import info from '../../../assets/infoSVG.svg'
import ProgressBar from '../../ui/ProgressBar'
import contract from '../../../assets/contract.svg'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'
import classNames from 'classnames'
import { Icon } from '../../ui/Icon'
import {
    Address,
    TokenTransfer,
    AddressCounters, TokenCounters, Transaction,
} from '../../../app/models/generated'
import { NavigateFunction, NavLink, useNavigate, useParams } from 'react-router-dom'
import { baseUrl } from '../MainPage/Main'
import { initialToken } from '../../../app/models/generated/models/Token'
import { formatNumber } from '../../../utils'
import { TokenTransferItems } from './TokenTransferItems'
import { initialAddress } from '../../../app/models/generated/models/Address'
import { TransactionItems } from './TransactionItems'

async function getAddress(
    setAddress: Dispatch<SetStateAction<Address>>,
    address: string | undefined,
    navigate: NavigateFunction
) {
    const url = baseUrl + '/addresses/' + address
    const fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        navigate('/error')
    } else {
        const result: Address = await fetchResult.json()
        setAddress(result)
    }
}

async function getCounters(
    setCounters: Dispatch<SetStateAction<AddressCounters | undefined>>,
    address: string | undefined
) {
    const url = baseUrl + '/addresses/' + address + '/counters'
    const fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        setCounters(undefined)
    } else {
        const result: AddressCounters = await fetchResult.json()
        setCounters(result)
    }
}

type TokenTransferList = {
    items: Array<TokenTransfer>
    next_page_params: Record<string, string> | null
}

async function getTokenTransfers(
    setTokenTransfers: Dispatch<SetStateAction<TokenTransferList>>,
    address: string | undefined,
    params: Record<string, string>
) {
    const url = baseUrl + '/addresses/' + address + '/token-transfers?'
    const searchParams = new URLSearchParams(params)

    const result: TokenTransferList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTokenTransfers(result)
}

type TransactionList = {
    items: Array<Transaction>
    next_page_params: Record<string, string> | null
}

async function getTransactions(
    setTransactions: Dispatch<SetStateAction<TransactionList>>,
    address: string | undefined,
    params: Record<string, string>
) {
    const url = baseUrl+ '/addresses/' + address + '/transactions?'
    const searchParams = new URLSearchParams(params)

    const result: TransactionList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTransactions(result)
}


const previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page = 1


export const AddressPage = () => {
    const navigate = useNavigate()
    const { address } = useParams()

    const [add, setAddress] = useState<Address>(initialAddress)
    const [counters, setCounters] = useState<AddressCounters>()
    const [transactions, setTransactions] = useState<TransactionList>({
        items: [],
        next_page_params: null,
    })
    const [tokenTransfers, setTokenTransfers] = useState<TokenTransferList>({
        items: [],
        next_page_params: null,
    })


    useEffect(() => {
        getAddress(setAddress, address, navigate)
    }, [])


    useEffect(() => {
        getTokenTransfers(setTokenTransfers, address, {})
    }, [])

    useEffect(() => {
        getCounters(setCounters, address)
    }, [])

    useEffect(() => {
        getTransactions(setTransactions, address, {})
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
                <Search />
            </section>
            <section className={styles.pageSection}>
                <div className={styles.headOfPage}>
                    <p>Address details</p>
                    <p className={styles.method}>EOA</p>
                </div>
                <div
                    className={classNames(
                        styles.address,
                        styles.mgtop20,
                        styles.contract
                    )}
                >
                    <img src={contract} alt="" />
                    {add.hash}
                </div>

                <div className={classNames(styles.details, styles.mgtop30)}>
                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Balance</p>
                        <span>{add.coin_balance}</span>
                        <span className={styles.valueType}>ETH</span>

                    </div>
                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Transactions</p>
                        <span>{counters
                            ? formatNumber(counters.transactions_count)
                            : 0}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Transfers</p>
                        <span>{counters
                            ? formatNumber(counters.token_transfers_count)
                            : 0}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Gas used</p>
                        <span>{counters
                            ? formatNumber(counters.gas_usage_count)
                            : 0}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Blocks validated</p>
                        <span>{counters
                            ? formatNumber(counters.validations_count)
                            : 0}</span>
                    </div>

                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Last balance update</p>
                        <NavLink
                            className={classNames(
                                styles.address,
                                styles.fontWeight500
                            )}
                            to={'/block/' + add.block_number_balance_updated_at}
                        >
                            {add.block_number_balance_updated_at}
                        </NavLink>
                    </div>

                </div>
                <Tabs>
                    <TabList>
                        <Tab>Transactions</Tab>
                        <Tab>Token transfers</Tab>
                    </TabList>

                    <TabPanel>
                        <div className={styles.validated}>
                            <div className={styles.paginationButtons}>
                                <button
                                    className={styles.controlButton}
                                    disabled={isDisabled}
                                    onClick={previousPageHandler}
                                >
                                    <img src={prev} alt="previous page" />
                                </button>
                                <div className={styles.pageNum}>{page}</div>
                                <button
                                    className={styles.controlButton}
                                    onClick={nextPageHandler}
                                >
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
                                            )}
                                        >
                                            Txn hash
                                        </th>
                                        <th
                                            className={classNames(
                                                styles.thType,
                                                styles.thDefault
                                            )}
                                        >
                                            Type
                                        </th>
                                        <th
                                            className={classNames(
                                                styles.thW10,
                                                styles.thDefault
                                            )}
                                        >
                                            Method
                                        </th>
                                        <th
                                            className={classNames(
                                                styles.thBlock,
                                                styles.thDefault
                                            )}
                                        >
                                            Block
                                        </th>
                                        <th
                                            className={classNames(
                                                styles.thFrom,
                                                styles.thDefault
                                            )}
                                        >
                                            From
                                        </th>
                                        <th className={styles.thIcon}></th>
                                        <th className={styles.thTo}>To</th>
                                        <th
                                            className={classNames(
                                                styles.thW12,
                                                styles.thDefaultRight
                                            )}
                                        >
                                            Value ETH
                                        </th>
                                        <th
                                            className={classNames(
                                                styles.th9p75,
                                                styles.thDefaultRight
                                            )}
                                        >
                                            Fee ETH
                                        </th>
                                    </tr>
                                    </thead>
                                    <TransactionItems
                                        TransactionArray={transactions.items}
                                    ></TransactionItems>
                                </table>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className={styles.transactions}>
                            <div className={styles.paginationButtons}>
                                <button
                                    className={styles.controlButton}
                                    disabled={isDisabled}
                                    onClick={previousPageHandler}
                                >
                                    <img src={prev} alt="previous page" />
                                </button>
                                <div className={styles.pageNum}>{page}</div>
                                <button
                                    className={styles.controlButton}
                                    onClick={nextPageHandler}
                                >
                                    <img src={next} alt="next page" />
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
                </Tabs>
            </section>
        </div>
    )
}
