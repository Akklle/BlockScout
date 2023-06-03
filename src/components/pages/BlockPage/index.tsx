import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './index.module.sass'
import { Search } from '../../ui/Search'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import './tabs.sass'
import info from '../../../assets/infoSVG.svg'
import fire from '../../../assets/fire.svg'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'
import { Block, Transaction } from '../../../app/models/generated'
import {
    Status,
    TypeOfTransaction,
} from '../MainPage/LatestTransactionComponent/LatestTransaction'
import classNames from 'classnames'
import { Icon } from '../../ui/Icon'
import ProgressBar from '../../ui/ProgressBar'
import { NavigateFunction, useParams } from 'react-router-dom'
import { baseUrl } from '../MainPage/Main'
import { initialBlock } from '../../../app/models/generated/models/Block'
import { useNavigate } from 'react-router-dom'
import {
    processedStringFromApi,
    calculateReward,
    getTimeFromTimestamp,
    formatNumber,
} from '../../../utils'

async function getBlock(
    setBlock: Dispatch<SetStateAction<Block>>,
    number: string | undefined,
    navigate: NavigateFunction
) {
    const url = baseUrl + '/blocks' + '/' + number
    const fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        navigate('/error')
    } else {
        const result: Block = await fetchResult.json()
        setBlock(result)
    }
}

async function getTransactions(
    setTransactions: Dispatch<SetStateAction<Array<Transaction>>>,
    number: string | undefined
) {
    const url = baseUrl + '/blocks' + '/' + number + '/transactions'
    const result: Array<Transaction> = await (await fetch(url)).json()
    setTransactions(result)
}

export const BlockPage = () => {
    const navigate = useNavigate()
    const { number } = useParams()
    const [block, setBlock] = useState<Block>(initialBlock)
    useEffect(() => {
        getBlock(setBlock, number, navigate)
    }, [])
    const [transactions, setTransactions] = useState<Array<Transaction>>([])
    useEffect(() => {
        getTransactions(setTransactions, number)
    }, [])
    const isDisabled = true
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
                                <p className={styles.rowLink}>
                                    <span>{block.tx_count}</span>
                                    <span>transactions</span>
                                </p>
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
                                <p className={styles.rowLink}>
                                    <span>{block.miner?.hash}</span>
                                </p>
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
                                        progress={
                                            block.gas_used_percentage
                                                ? block.gas_used_percentage
                                                : 0
                                        }
                                        width={39}
                                        height={3}></ProgressBar>
                                    <span>
                                        {block.gas_used_percentage
                                            ? block.gas_used_percentage.toFixed(
                                                  2
                                              )
                                            : 0}
                                        %
                                    </span>
                                    <div className={styles.verticalLine}></div>
                                    <span>
                                        {block.gas_target_percentage
                                            ? block.gas_target_percentage.toFixed(
                                                  2
                                              )
                                            : 0}
                                        %
                                    </span>
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
                                <span>
                                    {block.base_fee_per_gas
                                        ? (
                                              block.base_fee_per_gas /
                                              10 ** 18
                                          ).toFixed(18)
                                        : 0}
                                </span>
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
                                <span>
                                    {block.burnt_fees
                                        ? (block.burnt_fees / 10 ** 18).toFixed(
                                              18
                                          )
                                        : 0}
                                </span>
                                <span className={styles.valueType}>ETH</span>
                                <div className={styles.percentage}>
                                    <ProgressBar
                                        progressColor={'#59FFA4'}
                                        bgColor={'#8D8D8E'}
                                        progress={
                                            block.burnt_fees_percentage
                                                ? block.burnt_fees_percentage
                                                : 0
                                        }
                                        width={39}
                                        height={3}></ProgressBar>
                                    <span className={styles.percentageGreen}>
                                        {block.burnt_fees_percentage
                                            ? block.burnt_fees_percentage.toFixed(
                                                  2
                                              )
                                            : 0}
                                        %
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
                                <span>
                                    {block.priority_fee
                                        ? (
                                              block.priority_fee /
                                              10 ** 18
                                          ).toFixed(18)
                                        : 0}
                                </span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.transactions}>
                            <div className={styles.paginationButtons}>
                                <button
                                    className={styles.controlButton}
                                    disabled={isDisabled}>
                                    <img src={prev} alt="previous page" />
                                </button>
                                <div className={styles.pageNum}>1</div>
                                <button className={styles.controlButton}>
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
                                    <tbody className={styles.tableBody}>
                                        <tr className={styles.tableRow}>
                                            <td className={styles.tdCell}>
                                                <div>
                                                    <p
                                                        className={
                                                            styles.address
                                                        }>
                                                        0x56e43583e21393f5a4ecc...cb00
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.hashTime
                                                        }>
                                                        22:33:01
                                                    </p>
                                                </div>
                                            </td>
                                            <td className={styles.tdCell}>
                                                <div
                                                    className={
                                                        styles.typeAndStatus
                                                    }>
                                                    <TypeOfTransaction theme="token_transfer">
                                                        {processedStringFromApi(
                                                            'token_transfer'
                                                        )}
                                                    </TypeOfTransaction>
                                                    <Status theme="success">
                                                        {processedStringFromApi(
                                                            'success'
                                                        )}
                                                    </Status>
                                                </div>
                                            </td>
                                            <td className={styles.tdCell}>
                                                <p className={styles.method}>
                                                    commitAndForge
                                                </p>
                                            </td>
                                            <td className={styles.tdCell}>
                                                <div
                                                    className={
                                                        styles.addressGroup
                                                    }>
                                                    <div
                                                        className={
                                                            styles.angularAvatar
                                                        }></div>
                                                    <p
                                                        className={
                                                            styles.address
                                                        }>
                                                        0x75...1a90
                                                    </p>
                                                </div>
                                            </td>
                                            <td className={styles.tdIconCell}>
                                                <div>
                                                    <Icon
                                                        icon={'path'}
                                                        width={24}
                                                        height={6}
                                                    />
                                                </div>
                                            </td>
                                            <td className={styles.tdCellW}>
                                                <div
                                                    className={
                                                        styles.addressGroup
                                                    }>
                                                    <div
                                                        className={classNames(
                                                            styles.angularAvatar,
                                                            styles.receiver
                                                        )}></div>
                                                    <p
                                                        className={
                                                            styles.address
                                                        }>
                                                        0x8C...1a9D
                                                    </p>
                                                </div>
                                            </td>
                                            <td
                                                className={styles.tdCellRight}
                                                align={'right'}>
                                                0.05000234
                                            </td>
                                            <td
                                                className={styles.tdCellRight}
                                                align={'right'}>
                                                0.00488847
                                            </td>
                                        </tr>
                                        <tr className={styles.tableRow}>
                                            <td className={styles.tdCell}>
                                                <div>
                                                    <p
                                                        className={
                                                            styles.address
                                                        }>
                                                        0x56e43583e21393f5a4ecc...cb00
                                                    </p>
                                                    <p
                                                        className={
                                                            styles.hashTime
                                                        }>
                                                        22:33:01
                                                    </p>
                                                </div>
                                            </td>
                                            <td className={styles.tdCell}>
                                                <div
                                                    className={
                                                        styles.typeAndStatus
                                                    }>
                                                    <TypeOfTransaction theme="token_transfer">
                                                        {processedStringFromApi(
                                                            'token_transfer'
                                                        )}
                                                    </TypeOfTransaction>
                                                    <Status theme="success">
                                                        {processedStringFromApi(
                                                            'success'
                                                        )}
                                                    </Status>
                                                </div>
                                            </td>
                                            <td className={styles.tdCell}>
                                                <p className={styles.method}>
                                                    commitAndForge
                                                </p>
                                            </td>
                                            <td className={styles.tdCell}>
                                                <div
                                                    className={
                                                        styles.addressGroup
                                                    }>
                                                    <div
                                                        className={
                                                            styles.angularAvatar
                                                        }></div>
                                                    <p
                                                        className={
                                                            styles.address
                                                        }>
                                                        0x75...1a90
                                                    </p>
                                                </div>
                                            </td>
                                            <td className={styles.tdIconCell}>
                                                <div>
                                                    <Icon
                                                        icon={'path'}
                                                        width={24}
                                                        height={6}
                                                    />
                                                </div>
                                            </td>
                                            <td className={styles.tdCellW}>
                                                <div
                                                    className={
                                                        styles.addressGroup
                                                    }>
                                                    <div
                                                        className={classNames(
                                                            styles.angularAvatar,
                                                            styles.receiver
                                                        )}></div>
                                                    <p
                                                        className={
                                                            styles.address
                                                        }>
                                                        0x8C...1a9D
                                                    </p>
                                                </div>
                                            </td>
                                            <td
                                                className={styles.tdCellRight}
                                                align={'right'}>
                                                0.05000234
                                            </td>
                                            <td
                                                className={styles.tdCellRight}
                                                align={'right'}>
                                                0.00488847
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </section>
        </div>
    )
}
