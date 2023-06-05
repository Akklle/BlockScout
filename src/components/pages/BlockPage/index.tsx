import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'
import { Search } from '../../ui/Search'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import '../../../styles/tabs.sass'
import info from '../../../assets/infoSVG.svg'
import fire from '../../../assets/fire.svg'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'
import { Block } from '../../../app/models/generated'
import classNames from 'classnames'
import ProgressBar from '../../ui/ProgressBar'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { initialBlock } from '../../../app/models/generated/models/Block'
import {
    calculateReward,
    formatNumber,
    getTimeFromTimestamp,
} from '../../../utils'
import { TransactionItems } from '../TransactionsPage/TransactionItems'
import { TransactionList } from '../../../services/TransactionsPageService'
import { getBlock, getTransactions } from '../../../services/BlockPageService'

const previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page = 1

export const BlockPage = () => {
    const navigate = useNavigate()
    const { number } = useParams()
    const [block, setBlock] = useState<Block>(initialBlock)
    useEffect(() => {
        getBlock(setBlock, number, navigate)
    }, [])
    const [transactionList, setTransactions] = useState<TransactionList>({
        items: [],
        next_page_params: null,
    })
    useEffect(() => {
        getTransactions(setTransactions, number, {})
    }, [])

    const isDisabled = page == 1

    const previousPageHandler = () => {
        if (previousParams.length > 0) {
            page = page - 1
            currentParams = previousParams.pop() || {}
            getTransactions(setTransactions, number, currentParams)
        }
    }
    const nextPageHandler = () => {
        if (transactionList.next_page_params) {
            previousParams.push(currentParams)
            currentParams = transactionList.next_page_params
            page = page + 1
            getTransactions(setTransactions, number, currentParams)
        }
    }

    const gasUsedPercentage = block.gas_used_percentage
        ? Number(block.gas_used_percentage.toFixed(2))
        : 0
    const gasTargetPercentage = block.gas_target_percentage
        ? Number(block.gas_target_percentage.toFixed(2))
        : 0
    const baseFeePerGas = block.base_fee_per_gas
        ? (block.base_fee_per_gas / 10 ** 18).toFixed(18)
        : 0
    const burntFees = block.burnt_fees
        ? (block.burnt_fees / 10 ** 18).toFixed(18)
        : 0
    const burntFeesPercentage = block.burnt_fees_percentage
        ? Number(block.burnt_fees_percentage.toFixed(2))
        : 0
    const priorityFee = block.priority_fee
        ? (block.priority_fee / 10 ** 18).toFixed(18)
        : 0
    return (
        <div>
            <section className={styles.searchSection}>
                <Search />
            </section>
            <section className={styles.pageSection}>
                <div className={styles.headOfPage}>
                    <p>Block</p>
                    <p>#{block.height}</p>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>Transactions</Tab>
                    </TabList>

                    <TabPanel>
                        <div className={styles.details}>
                            <div className={styles.infoRow}>
                                <span data-hint="The block height of a particular block is defined as the number of blocks preceding it in the blockchain">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>Block height</p>
                                <p>{block.height}</p>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint="Size of the block in bytes">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>Size</p>
                                <p>{block.size}</p>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint="Date & time at which block was produced">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>Timestamp</p>
                                <p>{getTimeFromTimestamp(block.timestamp)}</p>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint="The number of transaction in block">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>Transactions</p>
                                <span>{block.tx_count}</span>
                                <span className={styles.valueType}>
                                    transactions
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint="A block producer who successfully included the block onto the blockchain">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>Validated by</p>
                                <NavLink
                                    to={'/address/' + block.miner?.hash}
                                    className={styles.rowLink}>
                                    {block.miner?.hash}
                                </NavLink>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint="For each block, the validator is rewarded with a finite amount of THE on top of the fees paid for all transactions in the block">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>Block reward</p>
                                <span>
                                    {calculateReward(block.rewards) / 10 ** 18}
                                </span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.infoRow}>
                                <span data-hint="The total gas amount used in the block and its percentage of gas filled in the block">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>Gas used</p>
                                <span className={styles.mgR20}>
                                    {formatNumber(block.gas_used)}
                                </span>
                                <div className={styles.percentage}>
                                    <ProgressBar
                                        progressColor={'#3CE2EC'}
                                        bgColor={'#8D8D8E'}
                                        progress={gasUsedPercentage}
                                        width={39}
                                        height={3}></ProgressBar>
                                    <span>{gasUsedPercentage}%</span>
                                    <div className={styles.verticalLine}></div>
                                    <span>{gasTargetPercentage}%</span>
                                </div>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint="Total gas limit provided by all transactions in the block">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>Gas limit</p>
                                <p>{formatNumber(block.gas_limit)}</p>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint="Minimum fee required per unit of gas. Fee adjusts based on network congestion">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>
                                    Base fee per gas
                                </p>
                                <span>{baseFeePerGas}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint="Amount of THE burned from transactions included in the block. Equals Block Base Fee per Gas * Gas Used">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>Burnt fees</p>
                                <img
                                    className={styles.gasIcon}
                                    src={fire}
                                    alt=""
                                />
                                <span>{burntFees}</span>
                                <span className={styles.valueType}>ETH</span>
                                <div className={styles.percentage}>
                                    <ProgressBar
                                        progressColor={'#59FFA4'}
                                        bgColor={'#8D8D8E'}
                                        progress={burntFeesPercentage}
                                        width={39}
                                        height={3}></ProgressBar>
                                    <span className={styles.percentageGreen}>
                                        {burntFeesPercentage}%
                                    </span>
                                </div>
                            </div>
                            <div className={styles.infoRow}>
                                <span data-hint="User-defined tips sent to validator for transaction priority/inclusion">
                                    <img
                                        className={styles.infoIcon}
                                        src={info}
                                        alt="more information"
                                    />
                                </span>
                                <p className={styles.rowTitle}>
                                    Priority fee / Tip
                                </p>
                                <span>{priorityFee}</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                        </div>
                    </TabPanel>
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
                                    disabled={!transactionList.next_page_params}
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
                                                    styles.th20p75,
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
                                                    styles.thW15,
                                                    styles.thDefault
                                                )}>
                                                Method
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
                                                    styles.thW15,
                                                    styles.thDefaultRight
                                                )}>
                                                Value ETH
                                            </th>
                                            <th
                                                className={classNames(
                                                    styles.th20p75,
                                                    styles.thDefaultRight
                                                )}>
                                                Fee ETH
                                            </th>
                                        </tr>
                                    </thead>
                                    <TransactionItems
                                        TransactionArray={transactionList.items}
                                        currentLocation="BlockPage"></TransactionItems>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </section>
        </div>
    )
}
