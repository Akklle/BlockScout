import React from 'react';
import styles from './index.module.sass';
import {Search} from "../../ui/Search";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import info from "../../../assets/infoSVG.svg";
import fire from "../../../assets/fire.svg";
import {
    Status,
    TypeOfTransaction
} from "../MainPage/LatestTransactionComponent/LatestTransaction";
import classNames from "classnames";
import {Icon} from "../../ui/Icon";
import ProgressBar from "../../ui/ProgressBar";
import prev from "../../../assets/arrow_prev.svg";
import next from "../../../assets/arrow_next.svg";
import {processedStringFromApi, stringTruncateFromCenter} from "../../../utils";

export const Transaction = () => {
    const isDisabled = true
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
                                <p>0x82011aBBaA7A0853dA47dD151f3546c400884fc8</p>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Status</p>
                                <Status
                                    theme="success">{processedStringFromApi("success")}</Status>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Block</p>
                                <a className={styles.rowLink}>
                                    <span>89026452</span>
                                </a>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Timestamp</p>
                                <p>May-13-2023 23:34:36 PM +03:00</p>
                                <span className={styles.valueType}>UTC</span>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>From</p>
                                <a className={styles.rowLink}>
                                    <span>0x82011aBBaA7A0853dA47dD151f3546c400884fc8</span>
                                </a>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>To</p>
                                <a className={styles.rowLink}>
                                    <span>0x82011aBBaA7A0853dA47dD151f3546c400884fc8</span>
                                </a>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Value</p>
                                <span>0.125683344452262762</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Transaction fee</p>
                                <span>0.125683344452262762</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Gas price</p>
                                <span>0.125683344452262762</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Gas limit & usage by txn</p>
                                <div className={styles.percentage}>
                                    <span>48.86</span>
                                    <div className={styles.verticalLine}></div>
                                    <span>48.86</span>
                                    <ProgressBar progressColor={'#3CE2EC'} bgColor={'#8D8D8E'} progress={50} width={39}
                                                 height={3}></ProgressBar>
                                    <span>-2.29%</span>
                                </div>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Gas fees (Gwei)</p>
                                <span className={styles.mgR20}>Base: <span>62.2434353422</span></span>
                                <div className={styles.verticalLine}></div>
                                <span className={styles.mgR20}>Max: <span>67.2434353422</span></span>
                                <div className={styles.verticalLine}></div>
                                <span className={styles.mgR20}>Max priority: <span>0</span></span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Burnt fees</p>
                                <img className={styles.gasIcon} src={fire} alt=""/>
                                <span>1.328880117708521148</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className={styles.tokenTransfers}>
                            <div className={styles.paginationButtons}>
                                <button className={styles.controlButton} disabled={isDisabled}><img src={prev}
                                                                                                    alt="previous page"/>
                                </button>
                                <div className={styles.pageNum}>1</div>
                                <button className={styles.controlButton}><img src={next} alt="next page"/></button>
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
                                    <tbody className={styles.tableBody}>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tdCell}>
                                            <div className={styles.addressGroup}>
                                                <div className={styles.angularAvatar}></div>
                                                <a className={styles.address}>Zeta</a>
                                            </div>
                                            <TypeOfTransaction
                                                theme="token_transfer">{processedStringFromApi("token_transfer")}</TypeOfTransaction>
                                        </td>
                                        <td className={styles.tdCell}>
                                            <div>
                                                <a className={styles.ID}>-</a>
                                            </div>
                                        </td>
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
                                        <td className={styles.tdCellRight} align={"right"}>0.00488847</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className={styles.traceBlock}>
                            Raw trace.......
                        </div>
                    </TabPanel>
                </Tabs>
            </section>

        </div>
    )
}