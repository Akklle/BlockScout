import React from 'react';
import styles from './index.module.sass';
import {Search} from "../../ui/Search";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import './tabs.sass'
import info from "../../../assets/infoSVG.svg";
import fire from "../../../assets/fire.svg";
export const Block = () => {
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
                                <span>16,084,450</span>
                                <div className={styles.percentage}>
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
                        <div>
                            <div className={styles.paginationButtons}>
                                <button></button>
                                <button>1</button>
                                <button></button>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </section>

        </div>
    )
}