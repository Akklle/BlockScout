import React from 'react';
import styles from './index.module.sass';
import {Search} from "../../ui/Search";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import './tabs.sass'
import prev from "../../../assets/arrow_prev.svg";
import next from "../../../assets/arrow_next.svg";
import {
    processedStringFromApi,
    Status,
    TypeOfTransaction
} from "../MainPage/LatestTransactionComponent/LatestTransaction";
import classNames from "classnames";
import {Icon} from "../../ui/Icon";

export const Transactions = () => {
    const isDisabled = true
    return (
        <div>
            <section className={styles.searchSection}>
                <Search/>
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
                        <div className={styles.validated}>
                            <div className={styles.paginationButtons}>
                                <button className={styles.controlButton} disabled={isDisabled}>
                                    <img src={prev} alt="previous page"/>
                                </button>
                                <div className={styles.pageNum}>1</div>
                                <button className={styles.controlButton}><img src={next} alt="next page"/></button>
                            </div>
                            <div className={styles.tableWrapper}>
                                <div className={styles.tableBorder}></div>
                                <table className={styles.table}>
                                    <thead className={styles.tableHead}>
                                    <tr>
                                        <th className={classNames(styles.th20p75, styles.thDefault)}>Txn hash</th>
                                        <th className={classNames(styles.thType, styles.thDefault)}>Type</th>
                                        <th className={classNames(styles.thW15, styles.thDefault)}>Method</th>
                                        <th className={classNames(styles.thBlock, styles.thDefault)}>Block</th>
                                        <th className={classNames(styles.thFrom, styles.thDefault)}>From</th>
                                        <th className={styles.thIcon}></th>
                                        <th className={styles.thTo}>To</th>
                                        <th className={classNames(styles.thW15, styles.thDefaultRight)}>Value ETH</th>
                                        <th className={classNames(styles.th20p75, styles.thDefaultRight)}>Fee ETH</th>
                                    </tr>
                                    </thead>
                                    <tbody className={styles.tableBody}>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tdCell}>
                                            <div>
                                                <a className={styles.address}>0x56e43583e21393f5a4ecc...cb00</a>
                                                <p className={styles.hashTime}>22:33:01</p>
                                            </div>
                                        </td>
                                        <td className={styles.tdCell}>
                                            <div className={styles.typeAndStatus}>
                                                <TypeOfTransaction
                                                    theme="coin_transfer">{processedStringFromApi("coin_transfer")}</TypeOfTransaction>
                                                <Status
                                                    theme="success">{processedStringFromApi("success")}</Status>
                                            </div>
                                        </td>
                                        <td className={styles.tdCell}><p className={styles.method}>transfer</p>
                                        </td>
                                        <td className={styles.tdCell}><p className={styles.block}>89012636</p></td>
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
                                                <div className={classNames(styles.angularAvatar, styles.receiver)}></div>
                                                <a className={styles.address}>0x8C...1a9D</a>
                                            </div>
                                        </td>
                                        <td className={styles.tdCellRight} align={"right"}>0.05000234</td>
                                        <td className={styles.tdCellRight} align={"right"}>0.00488847</td>


                                    </tr>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tdCell}>
                                            <div>
                                                <a className={styles.address}>0x56e43583e21393f5a4ecc...cb00</a>
                                                <p className={styles.hashTime}>22:33:01</p>
                                            </div>
                                        </td>
                                        <td className={styles.tdCell}>
                                            <div className={styles.typeAndStatus}>
                                                <TypeOfTransaction
                                                    theme="contract_call">{processedStringFromApi("contract_call")}</TypeOfTransaction>
                                                <Status
                                                    theme="success">{processedStringFromApi("success")}</Status>
                                            </div>
                                        </td>
                                        <td className={styles.tdCell}><p className={styles.method}>appendStateBatch</p>
                                        </td>
                                        <td className={styles.tdCell}><p className={styles.block}>89050936</p></td>
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
                                        <td className={styles.tdCellRight} align={"right"}>0.05000234</td>
                                        <td className={styles.tdCellRight} align={"right"}>0.00488847</td>

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