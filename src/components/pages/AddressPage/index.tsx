import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'
import '../../../styles/tabs.sass'
import { Search } from '../../ui/Search'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import info from '../../../assets/infoSVG.svg'
import contract from '../../../assets/contract.svg'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'
import classNames from 'classnames'
import { Address, AddressCounters } from '../../../app/models/generated'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { formatNumber, stringTruncateFromCenter } from '../../../utils'
import { TokenTransferItems } from './TokenTransferItems'
import { initialAddress } from '../../../app/models/generated/models/Address'
import { TransactionItems } from './TransactionItems'
import { TokenTransferList } from '../../../services/TransactionPageService'
import {
    getAddress,
    getCounters,
    getTokenTransfers,
    getTransactions,
} from '../../../services/AddressPageService'
import { TransactionList } from '../../../services/TransactionsPageService'

const previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page = 1

const previousParamsTxn: Record<string, string>[] = []
let currentParamsTxn: Record<string, string> = {}
let pageTxn = 1

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
    }, [address])

    useEffect(() => {
        getTokenTransfers(setTokenTransfers, address, {})
    }, [address])

    useEffect(() => {
        getCounters(setCounters, address)
    }, [address])

    useEffect(() => {
        getTransactions(setTransactions, address, {})
    }, [address])

    const isDisabled = page == 1
    const typeOfAddress = add.is_contract ? 'Contract' : 'Address'
    const avatarImg =
        typeOfAddress == 'Contract' ? (
            <img src={contract} alt="icon of address" />
        ) : (
            <div className={styles.angularAvatar}></div>
        )
    const previousPageHandlerTxn = () => {
        if (previousParamsTxn.length > 0) {
            pageTxn = pageTxn - 1
            currentParamsTxn = previousParamsTxn.pop() || {}
            getTransactions(setTransactions, address, currentParamsTxn)
        }
    }
    const nextPageHandlerTxn = () => {
        if (transactions.next_page_params) {
            previousParamsTxn.push(currentParamsTxn)
            currentParamsTxn = transactions.next_page_params
            pageTxn = pageTxn + 1
            getTransactions(setTransactions, address, currentParamsTxn)
        }
    }
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
                    <p>{typeOfAddress} details</p>
                    {typeOfAddress == 'Address' ? (
                        <p className={styles.method}>EOA</p>
                    ) : (
                        <p className={styles.method}>Contract</p>
                    )}
                    {add.token && <p className={styles.method}>Token</p>}
                </div>
                <div
                    className={classNames(
                        styles.address,
                        styles.mgtop20,
                        styles.contract
                    )}>
                    {avatarImg}
                    {add.hash}
                </div>

                <div className={classNames(styles.details, styles.mgtop30)}>
                    {add.token && (
                        <div className={styles.infoRow}>
                            <img
                                className={styles.infoIcon}
                                src={info}
                                alt="more information"
                            />
                            <p className={styles.rowTitle}>Token</p>
                            <span>{add.token?.name}</span>
                            <span className={styles.valueType}>ETH</span>
                        </div>
                    )}
                    {typeOfAddress == 'Contract' && (
                        <div className={styles.infoRow}>
                            <img
                                className={styles.infoIcon}
                                src={info}
                                alt="more information"
                            />
                            <p className={styles.rowTitle}>Creator</p>
                            <NavLink
                                className={styles.address}
                                to={'/address/' + add.creator_address_hash}>
                                {stringTruncateFromCenter(
                                    add.creator_address_hash,
                                    8
                                )}
                            </NavLink>
                            <p className={styles.connectionSpan}> at txn </p>
                            <NavLink
                                className={styles.address}
                                to={'/transaction/' + add.creation_tx_hash}>
                                {stringTruncateFromCenter(
                                    add.creation_tx_hash,
                                    8
                                )}
                            </NavLink>
                        </div>
                    )}
                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Balance</p>
                        <span>
                            {add.coin_balance
                                ? formatNumber(add.coin_balance)
                                : '0'}
                        </span>
                        <span className={styles.valueType}>ETH</span>
                    </div>
                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Transactions</p>
                        <span>
                            {counters
                                ? formatNumber(counters.transactions_count)
                                : 0}
                        </span>
                    </div>
                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Transfers</p>
                        <span>
                            {counters
                                ? formatNumber(counters.token_transfers_count)
                                : 0}
                        </span>
                    </div>
                    <div className={styles.infoRow}>
                        <img
                            className={styles.infoIcon}
                            src={info}
                            alt="more information"
                        />
                        <p className={styles.rowTitle}>Gas used</p>
                        <span>
                            {counters
                                ? formatNumber(counters.gas_usage_count)
                                : 0}
                        </span>
                    </div>
                    {add.has_validated_blocks && (
                        <div className={styles.infoRow}>
                            <img
                                className={styles.infoIcon}
                                src={info}
                                alt="more information"
                            />
                            <p className={styles.rowTitle}>Blocks validated</p>
                            <span>
                                {counters
                                    ? formatNumber(counters.validations_count)
                                    : 0}
                            </span>
                        </div>
                    )}

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
                            to={
                                '/block/' + add.block_number_balance_updated_at
                            }>
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
                        <div className={styles.transactions}>
                            <div className={styles.paginationButtons}>
                                <button
                                    className={styles.controlButton}
                                    disabled={isDisabled}
                                    onClick={previousPageHandlerTxn}>
                                    <img src={prev} alt="previous page" />
                                </button>
                                <div className={styles.pageNum}>{pageTxn}</div>
                                <button
                                    className={styles.controlButton}
                                    onClick={nextPageHandlerTxn}
                                    disabled={!transactions.next_page_params}>
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
                                        TransactionArray={
                                            transactions.items
                                        }></TransactionItems>
                                </table>
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
                                        onClick={nextPageHandler}
                                        disabled={
                                            !tokenTransfers.next_page_params
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
                </Tabs>
            </section>
        </div>
    )
}
