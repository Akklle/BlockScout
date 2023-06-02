import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styles from "./index.module.sass";
import '../BlockPage/tabs.sass'
import {Search} from "../../ui/Search";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import info from "../../../assets/infoSVG.svg";
import ProgressBar from "../../ui/ProgressBar";
import contract from "../../../assets/contract.svg";
import prev from "../../../assets/arrow_prev.svg";
import next from "../../../assets/arrow_next.svg";
import classNames from "classnames";
import {Icon} from "../../ui/Icon";
import {Holder, SmartContract, Token, TokenCounters, TokenTransfer} from "../../../app/models/generated";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {baseUrl} from "../MainPage/Main";
import {initialToken} from "../../../app/models/generated/models/Token";
import {formatNumber} from "../../../utils";
import {TokenTransferItems} from "./TokenTransferItems";
import {HolderItems} from "./HolderItems";

async function getToken(setToken: Dispatch<SetStateAction<Token>>, address: string | undefined, navigate: NavigateFunction) {
    let url = baseUrl + '/tokens/' + address
    let fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        navigate('/error')
    } else {
        let result: Token = await fetchResult.json()
        setToken(result)
    }
}

type TokenTransferList = {
    items: Array<TokenTransfer>,
    next_page_params: Record<string, string> | null
}

type HolderList = {
    items: Array<Holder>,
    next_page_params: Record<string, string> | null
}

async function getTokenTransfers(setTokenTransfers: Dispatch<SetStateAction<TokenTransferList>>, address: string | undefined, params: Record<string, string>) {
    let url = baseUrl + '/tokens/' + address + '/transfers?'
    let searchParams = new URLSearchParams(params);

    let result: TokenTransferList = await (await fetch(url + searchParams.toString())).json()
    setTokenTransfers(result)
}

async function getHolders(setHolders: Dispatch<SetStateAction<HolderList>>, address: string | undefined, params: Record<string, string>) {
    let url = baseUrl + '/tokens/' + address + '/holders?'
    let searchParams = new URLSearchParams(params);

    let result: HolderList = await (await fetch(url + searchParams.toString())).json()
    setHolders(result)
}

async function getSmartContract(setSmartContract: Dispatch<SetStateAction<SmartContract | undefined>>, address: string | undefined) {
    let url = baseUrl + '/smart-contracts/' + address
    let fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        setSmartContract(undefined)
    } else {
        let result: SmartContract = await fetchResult.json()
        setSmartContract(result)
    }
}

async function getCounters(setCounters: Dispatch<SetStateAction<TokenCounters | undefined>>, address: string | undefined) {
    let url = baseUrl + '/tokens/' + address + '/counters'
    let fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        setCounters(undefined)
    } else {
        let result: TokenCounters = await fetchResult.json()
        setCounters(result)
    }
}

let previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page: number = 1
let previousHoldersParams: Record<string, string>[] = []
let currentHoldersParams: Record<string, string> = {}
let pageHolders: number = 1

export const TokenPage = () => {
    const navigate = useNavigate();
    const {address} = useParams()

    const [token, setToken] = useState<Token>(initialToken);
    const [smartContract, setSmartContract] = useState<SmartContract>();
    const [counters, setCounters] = useState<TokenCounters>();
    const [tokenTransfers, setTokenTransfers] = useState<TokenTransferList>({items: [], next_page_params: null});
    const [holders, setHolders] = useState<HolderList>({items: [], next_page_params: null});

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

    return (
        <div>
            <section className={styles.searchSection}>
                <Search/>
            </section>
            <section className={styles.pageSection}>
                <div className={styles.headOfPage}>
                    <p>{token.name}</p>
                    <p>token</p>
                    <p className={styles.method}>{token.type}</p>
                </div>
                <div className={classNames(styles.address, styles.mgtop20, styles.contract)}>
                    <img src={contract} alt=""/>
                    {token.address}
                </div>

                <div className={classNames(styles.details, styles.mgtop30)}>
                    <div className={styles.infoRow}>
                        <img className={styles.infoIcon} src={info} alt="more information"/>
                        <p className={styles.rowTitle}>Max total supply</p>
                        <p>{formatNumber(BigInt(token.total_supply) / BigInt(10 ** Number(token.decimals)))}</p>
                        <span className={styles.valueType}>{token.symbol}</span>
                    </div>
                    <div className={styles.infoRow}>
                        <img className={styles.infoIcon} src={info} alt="more information"/>
                        <p className={styles.rowTitle}>Holders</p>
                        <p>{formatNumber(token.holders)}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <img className={styles.infoIcon} src={info} alt="more information"/>
                        <p className={styles.rowTitle}>Transfers</p>
                        <p>{counters ? formatNumber(counters.transfers_count) : 0}</p>
                    </div>
                    <div className={styles.infoRow}>
                        <img className={styles.infoIcon} src={info} alt="more information"/>
                        <p className={styles.rowTitle}>Decimals</p>
                        <p>{token.decimals}</p>
                    </div>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Token transfers</Tab>
                        <Tab>Holders</Tab>
                        {smartContract ? (<Tab>Contract</Tab>) : (<span></span>)}
                    </TabList>

                    <TabPanel>
                        <div className={styles.transactions}>
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
                                        <th className={classNames(styles.thW40, styles.thDefault)}>Txn hash</th>
                                        <th className={classNames(styles.thW20, styles.thDefault)}>Method</th>
                                        <th className={classNames(styles.thFrom, styles.thDefault)}>From</th>
                                        <th className={styles.thIcon}></th>
                                        <th className={styles.thTo}>To</th>
                                        <th className={classNames(styles.thW40, styles.thDefaultRight)}>Value hUSDC</th>
                                    </tr>
                                    </thead>
                                    <TokenTransferItems TokenTransferArray={tokenTransfers.items}></TokenTransferItems>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.transactions}>
                            <div className={styles.paginationButtons}>
                                <button className={styles.controlButton} disabled={isDisabledHolders} onClick={previousPageHoldersHandler}><img src={prev}
                                                                                                    alt="previous page"/>
                                </button>
                                <div className={styles.pageNum}>{pageHolders}</div>
                                <button className={styles.controlButton} onClick={nextPageHoldersHandler}><img src={next} alt="next page"/></button>
                            </div>
                            <div className={styles.tableWrapper}>
                                <div className={styles.tableBorder}></div>
                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                    <tr>
                                        <th className={classNames(styles.thW60, styles.thDefault)}>Txn hash</th>
                                        <th className={classNames(styles.thW20, styles.thDefaultRight)}>Quantity</th>
                                        <th className={classNames(styles.thW20, styles.thDefaultRight)}>Percentage</th>
                                    </tr>
                                    </thead>
                                    <HolderItems HolderArray={holders.items}></HolderItems>
                                    {/*<tbody className={styles.tableBody}>*/}
                                    {/*<tr className={styles.tableRow}>*/}
                                    {/*    <td className={styles.tdCell}>*/}
                                    {/*        <div className={styles.addressGroup}>*/}
                                    {/*            <div*/}
                                    {/*                className={classNames(styles.angularAvatar, styles.receiver)}></div>*/}
                                    {/*            <a className={styles.address}>0xfffffACc41E00f96F6af4AF0154AD18749C9d5eA</a>*/}
                                    {/*        </div>*/}

                                    {/*    </td>*/}

                                    {/*    <td className={styles.tdCellRight} align={"right"}>1,185</td>*/}
                                    {/*    <td className={classNames(styles.tdCellRight, styles.flexEnd)}>*/}
                                    {/*        <div className={styles.percentage}>*/}
                                    {/*            <ProgressBar progressColor={'#59FFA4'} bgColor={'#8D8D8E'} progress={10}*/}
                                    {/*                         width={39}*/}
                                    {/*                         height={3}></ProgressBar>*/}
                                    {/*            <span>10%</span>*/}

                                    {/*        </div>*/}
                                    {/*    </td>*/}


                                    {/*</tr>*/}
                                    {/*</tbody>*/}
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.contractsBlock}>
                            <div className={styles.codeBlock}>
                                <p className={styles.paragraph}>Contract creation code</p>
                                <div className={styles.code}>
                                    {smartContract?.creation_bytecode}
                                </div>
                            </div>
                            <div className={styles.codeBlock}>
                                <p className={styles.paragraph}>Deployed ByteCode</p>
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