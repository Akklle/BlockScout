import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'
import '../../../styles/tabs.sass'
import { Search } from '../../ui/Search'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import info from '../../../svg-icons/infoSVG.svg'
import contract from '../../../svg-icons/contract.svg'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'
import classNames from 'classnames'
import {
    SmartContract,
    Token,
    TokenCounters,
} from '../../../app/models/generated'
import { useNavigate, useParams } from 'react-router-dom'
import { initialToken } from '../../../app/models/generated/models/Token'
import { formatNumber } from '../../../utils'
import { TokenTransferItems } from './TokenTransferItems'
import { HolderItems } from './HolderItems'
import {
    getCounters,
    getHolders,
    getSmartContract,
    getToken,
    getTokenTransfers,
    HolderList,
} from '../../../services/TokenPageService'
import { TokenTransferList } from '../../../services/TransactionPageService'
import { Icon } from '../../ui/Icon'

const previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page = 1

const previousHoldersParams: Record<string, string>[] = []
let currentHoldersParams: Record<string, string> = {}
let pageHolders = 1

export const TokenPage = () => {
    const navigate = useNavigate()
    const { address } = useParams()

    const [token, setToken] = useState<Token>(initialToken)
    const [smartContract, setSmartContract] = useState<SmartContract>()
    const [counters, setCounters] = useState<TokenCounters>()
    const [tokenTransfers, setTokenTransfers] = useState<TokenTransferList>({
        items: [],
        next_page_params: null,
    })
    const [holders, setHolders] = useState<HolderList>({
        items: [],
        next_page_params: null,
    })

    useEffect(() => {
        getToken(setToken, address, navigate)
    }, [])

    useEffect(() => {
        getSmartContract(setSmartContract, address)
    }, [])

    useEffect(() => {
        getCounters(setCounters, address)
    }, [])

    useEffect(() => {
        getTokenTransfers(setTokenTransfers, address, {})
    }, [])

    useEffect(() => {
        getHolders(setHolders, address, {})
    }, [])

    const isDisabled = page == 1
    const isDisabledHolders = pageHolders == 1

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
    const previousPageHoldersHandler = () => {
        if (previousHoldersParams.length > 0) {
            pageHolders = pageHolders - 1
            currentHoldersParams = previousHoldersParams.pop() || {}
            getHolders(setHolders, address, currentHoldersParams)
        }
    }
    const nextPageHoldersHandler = () => {
        if (holders.next_page_params) {
            previousHoldersParams.push(currentHoldersParams)
            currentHoldersParams = holders.next_page_params
            pageHolders = pageHolders + 1
            getHolders(setHolders, address, currentHoldersParams)
        }
    }

    const totalSupply = token.total_supply ? formatNumber(
        BigInt(token.total_supply) / BigInt(10 ** Number(token.decimals)),
    ) : 0
    const transferCount = counters ? formatNumber(counters.transfers_count) : 0

    return (
        <div>
            <section className={styles.searchSection}>
                <Search />
            </section>
            <section className={styles.pageSection}>
                <div className={styles.headOfPage}>
                    <p>{token.name}</p>
                    <p>token</p>
                    <p className={styles.method}>{token.type}</p>
                </div>
                <div
                    className={classNames(
                        styles.address,
                        styles.mgtop20,
                        styles.contract,
                    )}>
                    <Icon icon={'contract'} width={21} /> {token.address}
                </div>

                <div className={classNames(styles.details, styles.mgtop30)}>
                    <div className={styles.infoRow}>
                        <span
                            data-hint='The total amount of tokens issued'>
                            <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                        </span>


                        <p className={styles.rowTitle}>Max total supply</p>
                        <p>{totalSupply}</p>
                        <span className={styles.valueType}>{token.symbol}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <span
                            data-hint='Number of accounts holding the token'>
                            <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                        </span>

                        <p className={styles.rowTitle}>Holders</p>
                        <p>{formatNumber(token.holders)}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <span
                            data-hint='Number of transfer for the token'>
                            <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                        </span>

                        <p className={styles.rowTitle}>Transfers</p>
                        <p>{transferCount}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <span
                            data-hint='Number of digits that come after the decimal place when displaying token value'>
                            <Icon icon='infoSVG' width={14} height={14} color={'white'} />
                        </span>

                        <p className={styles.rowTitle}>Decimals</p>
                        <p>{token.decimals}</p>
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Token transfers</Tab>
                        <Tab>Holders</Tab>
                        {smartContract ? <Tab>Contract</Tab> : <span></span>}
                    </TabList>

                    <TabPanel>
                        <div className={styles.transactions}>
                            <div className={styles.paginationButtons}>
                                <button
                                    className={styles.controlButton}
                                    disabled={isDisabled}
                                    onClick={previousPageHandler}>
                                    <img src={prev} alt='previous page' />
                                </button>
                                <div className={styles.pageNum}>{page}</div>
                                <button
                                    className={styles.controlButton}
                                    onClick={nextPageHandler}
                                    disabled={
                                        !tokenTransfers.next_page_params
                                    }>
                                    <img src={next} alt='next page' />
                                </button>
                            </div>
                            <div className={styles.tableWrapper}>
                                <div className={styles.tableBorder}></div>
                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                    <tr>
                                        <th
                                            className={classNames(
                                                styles.thW40,
                                                styles.thDefault,
                                            )}>
                                            Txn hash
                                        </th>
                                        <th
                                            className={classNames(
                                                styles.thW20,
                                                styles.thDefault,
                                            )}>
                                            Method
                                        </th>
                                        <th
                                            className={classNames(
                                                styles.thFrom,
                                                styles.thDefault,
                                            )}>
                                            From
                                        </th>
                                        <th className={styles.thIcon}></th>
                                        <th className={styles.thTo}>To</th>
                                        <th
                                            className={classNames(
                                                styles.thW40,
                                                styles.thDefaultRight,
                                            )}>
                                            Value hUSDC
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
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.transactions}>
                            <div className={styles.paginationButtons}>
                                <button
                                    className={styles.controlButton}
                                    disabled={isDisabledHolders}
                                    onClick={previousPageHoldersHandler}>
                                    <img src={prev} alt='previous page' />
                                </button>
                                <div className={styles.pageNum}>
                                    {pageHolders}
                                </div>
                                <button
                                    className={styles.controlButton}
                                    onClick={nextPageHoldersHandler}
                                    disabled={
                                        !holders.next_page_params
                                    }>
                                    <img src={next} alt='next page' />
                                </button>
                            </div>
                            <div className={styles.tableWrapper}>
                                <div className={styles.tableBorder}></div>
                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                    <tr>
                                        <th
                                            className={classNames(
                                                styles.thW60,
                                                styles.thDefault,
                                            )}>
                                            Holders
                                        </th>
                                        <th
                                            className={classNames(
                                                styles.thW20,
                                                styles.thDefaultRight,
                                            )}>
                                            Quantity
                                        </th>
                                        <th
                                            className={classNames(
                                                styles.thW20,
                                                styles.thDefaultRight,
                                            )}>
                                            Percentage
                                        </th>
                                    </tr>
                                    </thead>
                                    <HolderItems
                                        HolderArray={
                                            holders.items
                                        }></HolderItems>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.contractsBlock}>
                            <div className={styles.codeBlock}>
                                <p className={styles.paragraph}>
                                    Contract creation code
                                </p>
                                <div className={styles.code}>
                                    {smartContract?.creation_bytecode}
                                </div>
                            </div>
                            <div className={styles.codeBlock}>
                                <p className={styles.paragraph}>
                                    Deployed ByteCode
                                </p>
                                <div className={styles.code}>
                                    {smartContract?.deployed_bytecode}
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </section>
        </div>
    )
}
