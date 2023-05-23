import React from 'react';
import styles from './index.module.sass';
import {Search} from "../../ui/Search";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import './tabs.sass'
import info from "../../../assets/infoSVG.svg";
import fire from "../../../assets/fire.svg";
import prev from "../../../assets/arrow_prev.svg";
import next from "../../../assets/arrow_next.svg";
import {
    processedStringFromApi,
    Status,
    TypeOfTransaction
} from "../MainPage/LatestTransactionComponent/LatestTransaction";
import classNames from "classnames";
import {stringTruncateFromCenter} from "../MainPage/LatestBlocksComponent/LatestBlock";
import {Icon} from "../../ui/Icon";
import ProgressBar from "../../ui/ProgressBar";

export const Block = () => {
    const isDisabled = true
    return (
        <div>
            <section className={styles.searchSection}>
                <Search/>
            </section>
            <section className={styles.blockSection}>
                <div className={styles.blockParagraph}>
                    <p>Block</p>
                    <p>#8829949</p>
                </div>
                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        <Tab>Transactions</Tab>
                    </TabList>

                    <TabPanel>
                        <div className={styles.details}>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Block height</p>
                                <p>8829949</p>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Size</p>
                                <p>129,996</p>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Timestamp</p>
                                <p>May-13-2023 23:34:36 PM +03:00</p>
                                <span className={styles.valueType}>UTC</span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Transactions</p>
                                <a className={styles.rowLink}>
                                    <span>102</span>
                                    <span>transactions</span>
                                </a>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Transactions</p>
                                <a className={styles.rowLink}>
                                    <span>0x82011aBBaA7A0853dA47dD151f3546c400884fc8</span>
                                </a>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Block reward</p>
                                <span>0.125683344452262762</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.line}></div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Gas used</p>
                                <span className={styles.mgR20}>16,084,450</span>
                                <div className={styles.percentage}>
                                    <ProgressBar progressColor={'#3CE2EC'} bgColor={'#8D8D8E'} progress={50} width={39}
                                                 height={3}></ProgressBar>
                                    <span>48.86%</span>
                                    <div className={styles.verticalLine}></div>
                                    <span>-2.29%</span>
                                </div>

                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Gas limit</p>
                                <p>30,000,000</p>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Base fee per gas</p>
                                <span>0.000000076309101546</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Burnt fees</p>
                                <img className={styles.gasIcon} src={fire} alt=""/>
                                <span>1.328880117708521148</span>
                                <span className={styles.valueType}>ETH</span>
                                <div className={styles.percentage}>
                                    <ProgressBar progressColor={'#59FFA4'} bgColor={'#8D8D8E'} progress={94.49}
                                                 width={39} height={3}></ProgressBar>
                                    <span className={styles.percentageGreen}>94.49%</span>
                                </div>
                            </div>
                            <div className={styles.infoRow}>
                                <img className={styles.infoIcon} src={info} alt="more information"/>
                                <p className={styles.rowTitle}>Priority fee / Tip</p>
                                <span>0.125683344452262762</span>
                                <span className={styles.valueType}>ETH</span>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={styles.transactions}>
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
                                        <th className={classNames(styles.th20p75, styles.thDefault)}>Txn hash</th>
                                        <th className={classNames(styles.thType, styles.thDefault)}>Type</th>
                                        <th className={classNames(styles.thW15, styles.thDefault)}>Method</th>
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
                                                    theme="token_transfer">{processedStringFromApi("token_transfer")}</TypeOfTransaction>
                                                <Status
                                                    theme="success">{processedStringFromApi("success")}</Status>
                                            </div>
                                        </td>
                                        <td className={styles.tdCell}><p className={styles.method}>commitAndForge</p>
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
                                                    theme="token_transfer">{processedStringFromApi("token_transfer")}</TypeOfTransaction>
                                                <Status
                                                    theme="success">{processedStringFromApi("success")}</Status>
                                            </div>
                                        </td>
                                        <td className={styles.tdCell}><p className={styles.method}>commitAndForge</p>
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