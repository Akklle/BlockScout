import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'
import { Search } from '../../ui/Search'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import info from '../../../svg-icons/infoSVG.svg'
import fire from '../../../svg-icons/fire.svg'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'
import { getTimeFromTimestamp, round } from '../../../utils'
import { Transaction } from '../../../app/models/generated'
import classNames from 'classnames'
import ProgressBar from '../../ui/ProgressBar'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { initialTransaction } from '../../../app/models/generated/models/Transaction'
import { TokenTransferItems } from './TokenTransferItems'
import { Status } from '../../ui/Status'
import {
    getTokenTransfers,
    getTransaction,
    TokenTransferList,
} from '../../../services/TransactionPageService'
import { Icon } from '../../ui/Icon'

const previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page = 1

export const TransactionPage = () => {
    const navigate = useNavigate()
    const { address } = useParams()

    const [transaction, setTransactions] =
        useState<Transaction>(initialTransaction)
    const [tokenTransfers, setTokenTransfers] = useState<TokenTransferList>({
        items: [],
        next_page_params: null,
    })

    useEffect(() => {
        getTransaction(setTransactions, address, navigate)
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

    const value =
        transaction.value === '0'
            ? 0
            : round(Number(transaction.fee?.value) / 10 ** 18, 12)
    const transactionFee = round(Number(transaction.fee?.value) / 10 ** 18, 12)
    const gasPrice = (Number(transaction.gas_price) / 10 ** 18).toFixed(18)
    const gasLimit = Number(transaction.gas_limit)
        ? Number(transaction.gas_limit)
        : 0
    const gasUsed = Number(transaction.gas_used)
        ? Number(transaction.gas_used)
        : 0
    const percentage = Number(
        (
            (Number(transaction.gas_used) / Number(transaction.gas_limit)) *
            100
        ).toFixed(2)
    )
    const baseFee = (Number(transaction.base_fee_per_gas) / 10 ** 9).toFixed(10)
    const maxFee = (Number(transaction.max_fee_per_gas) / 10 ** 9).toFixed(10)
    const maxPriority = (
        Number(transaction.max_priority_fee_per_gas) /
        10 ** 9
    ).toFixed(10)
    const burntFees = (Number(transaction.tx_burnt_fee) / 10 ** 18).toFixed(18)
    return (
        <div>
            <section className={styles.searchSection}>
                <Search />
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
                                <span data-hint='Unique character string (TxID) assigned to every verified transaction'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>
                                    Transaction hash
                                </p>
                                <p>{transaction.hash}</p>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint='Current transaction state: Success, Failed (Error), or Pending (In Process)'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>Status</p>
                                <Status theme={transaction.status}>{}</Status>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint='Block number containing the transaction'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>Block</p>
                                <NavLink to={'/block/' + transaction.block} className={styles.rowLink}>
                                    <span>{transaction.block}</span>
                                </NavLink>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint='Date & time of transaction inclusion, including length of time for confirmation'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>Timestamp</p>
                                <p>
                                    {transaction.timestamp
                                        ? getTimeFromTimestamp(
                                              transaction.timestamp
                                          )
                                        : ''}
                                </p>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.infoRow}>
                                <span data-hint='Address (external or contract) sending the transaction'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>From</p>
                                <NavLink
                                    className={classNames(
                                        styles.address,
                                        styles.fontWeight500
                                    )}
                                    to={
                                        '/address/' + transaction.from?.hash
                                    }>
                                    {transaction.from?.hash}
                                </NavLink>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint='Address (external or contract) receiving the transaction'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>To</p>
                                <NavLink
                                    className={classNames(
                                        styles.address,
                                        styles.fontWeight500
                                    )}
                                    to={'/address/' + transaction.to?.hash}>
                                    {transaction.to?.hash}
                                </NavLink>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.infoRow}>
                                <span data-hint=' Value sent in the native token (and USD) if applicable'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>Value</p>
                                <span>{value}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint='Total transaction fee'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>
                                    Transaction fee
                                </p>
                                <span>{transactionFee}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint='Price per unit of gas specified by the sender. Higher gas prices can prioritize
                                 transaction inclusion during times of high usage'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>Gas price</p>
                                <span>{gasPrice}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint='Actual gas amount used by the transaction'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>
                                    Gas limit & usage by txn
                                </p>
                                <div className={styles.percentage}>
                                    <span>{gasLimit}</span>
                                    <div className={styles.verticalLine}></div>
                                    <span>{gasUsed}</span>
                                    <ProgressBar
                                        progressColor={'#3CE2EC'}
                                        bgColor={'#8D8D8E'}
                                        progress={percentage}
                                        width={39}
                                        height={3}></ProgressBar>
                                    <span>{percentage}%</span>
                                </div>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint='Base Fee refers to the network Base Fee at the time of the block, while
                                Max Fee & Max Priority Fee refer to the max amount a user is willing to pay for their tx & to give to the limit miner respectively'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>
                                    Gas fees (Gwei)
                                </p>
                                <span className={styles.mgR20}>
                                    Base: <span>{baseFee}</span>
                                </span>
                                <div className={styles.verticalLine}></div>
                                <span className={styles.mgR20}>
                                    Max: <span>{maxFee}</span>
                                </span>
                                <div className={styles.verticalLine}></div>
                                <span className={styles.mgR20}>
                                    Max priority: <span>{maxPriority}</span>
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint='Amount of THE burned for this transaction. Equals Block Base Fee per Gas * Gas Used'>
                                    <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                                </span>
                                <p className={styles.rowTitle}>Burnt fees</p>
                                <Icon icon="fire" width={20} height={20} color={"white"}/>
                                <span>{burntFees}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        {tokenTransfers.items.length == 0 ? (
                            <p className={styles.message}>
                                There are no token transfers.
                            </p>
                        ) : (
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
                                        disabled={
                                            !tokenTransfers.next_page_params
                                        }
                                        onClick={nextPageHandler}>
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
                                                        styles.thW30,
                                                        styles.thDefault
                                                    )}>
                                                    Token
                                                </th>
                                                <th
                                                    className={classNames(
                                                        styles.thW30,
                                                        styles.thDefault
                                                    )}>
                                                    Token ID
                                                </th>
                                                <th
                                                    className={classNames(
                                                        styles.thFrom,
                                                        styles.thDefault
                                                    )}>
                                                    From
                                                </th>
                                                <th
                                                    className={
                                                        styles.thIcon
                                                    }></th>
                                                <th className={styles.thTo}>
                                                    To
                                                </th>
                                                <th
                                                    className={classNames(
                                                        styles.thW40,
                                                        styles.thDefaultRight
                                                    )}>
                                                    Value
                                                </th>
                                            </tr>
                                        </thead>
                                        <TokenTransferItems
                                            TokenTransferArray={
                                                tokenTransfers.items
                                            }></TokenTransferItems>
                                    </table>
                                </div>
                            </div>
                        )}
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
