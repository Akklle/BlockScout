import React from 'react';
import styles from "../BlocksPage/index.module.sass";
import {Search} from "../../ui/Search";
import ProgressBar from "../../ui/ProgressBar";
import fire from "../../../assets/fire.svg";
import prev from "../../../assets/arrow_prev.svg";
import next from "../../../assets/arrow_next.svg";
import classNames from "classnames";
import {
    processedStringFromApi,
    Status,
    TypeOfTransaction
} from "../MainPage/LatestTransactionComponent/LatestTransaction";
import {Icon} from "../../ui/Icon";

export const Blocks = () => {
    const isDisabled = true
    return (
        <div>
            <section className={styles.searchSection}>
                <Search/>
            </section>
            <section className={styles.pageSection}>
                <div className={classNames(styles.headOfPage, styles.jcsb)}>
                    <p>Blocks</p>
                    <div className={styles.paginationButtons}>
                        <button className={styles.controlButton} disabled={isDisabled}><img src={prev}
                                                                                            alt="previous page"/>
                        </button>
                        <div className={styles.pageNum}>1</div>
                        <button className={styles.controlButton}><img src={next} alt="next page"/></button>
                    </div>
                </div>


                <div>
                    <div className={styles.tableWrapper}>
                        <div className={styles.tableBorder}></div>
                        <table className={styles.table}>
                            <thead className={styles.tableHead}>
                            <tr>
                                <th className={classNames(styles.thBlock, styles.thDefault)}>Block</th>
                                <th className={classNames(styles.thSize, styles.thDefault)}>Size, bytes</th>
                                <th className={classNames(styles.thW8, styles.thDefault)}>Validator</th>
                                <th className={classNames(styles.thTxn, styles.thDefault)}>Txn</th>
                                <th className={classNames(styles.thGas, styles.thDefault)}>Gas used</th>
                                <th className={classNames(styles.thW8, styles.thDefaultRight)}>Reward ETH</th>
                                <th className={classNames(styles.thW10, styles.thDefaultRight)}>Burnt fees ETH</th>
                            </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                            <tr className={styles.tableRow}>
                                <td className={styles.tdCell}>
                                    <div>
                                        <a className={classNames(styles.address, styles.fontWeight500)}>8808138</a>
                                        <p className={styles.hashTime}>22:33:01</p>
                                    </div>
                                </td>
                                <td className={styles.tdCell}>
                                    317,175
                                </td>
                                <td className={styles.tdCell}><a className={styles.address}>0xf3...6000</a>
                                </td>
                                <td className={styles.tdCell}>16
                                </td>
                                <td className={styles.tdCell}>
                                    <div className={styles.gasUsedCell}>
                                        <p>9,783,995</p>
                                        <div className={styles.percentage}>
                                            <ProgressBar progressColor={'#3CE2EC'} bgColor={'#8D8D8E'} progress={48}
                                                         width={39}
                                                         height={3}></ProgressBar>
                                            <span>48.86%</span>
                                            <div className={styles.verticalLine}></div>
                                            <span>-2.29%</span>
                                        </div>
                                    </div>
                                </td>
                                <td className={styles.tdCellRight} align={"right"}>0.14949587</td>
                                <td className={styles.tdCellRight} >
                                    <div className={styles.burntFeeCell}>
                                        <div className={styles.brFeeTop}>
                                        <img src={fire} alt=""/>
                                        <p>0.54727044</p>
                                        </div>
                                        <div className={styles.percentage}>
                                            <ProgressBar progressColor={'#59FFA4'} bgColor={'#8D8D8E'} progress={94}
                                                         width={39}
                                                         height={3}></ProgressBar>
                                            <span>94.49%</span>
                                        </div>
                                    </div>
                                </td>


                            </tr>
                            <tr className={styles.tableRow}>
                                <td className={styles.tdCell}>
                                    <div>
                                        <a className={styles.address}>8808138</a>
                                        <p className={styles.hashTime}>22:33:01</p>
                                    </div>
                                </td>
                                <td className={styles.tdCell}>
                                    317,175
                                </td>
                                <td className={styles.tdCell}><a className={styles.address}>0xf3...6000</a>
                                </td>
                                <td className={styles.tdCell}>16
                                </td>
                                <td className={styles.tdCell}>
                                    <div className={styles.gasUsedCell}>
                                        <p>9,783,995</p>
                                        <div className={styles.percentage}>
                                            <ProgressBar progressColor={'#3CE2EC'} bgColor={'#8D8D8E'} progress={48}
                                                         width={39}
                                                         height={3}></ProgressBar>
                                            <span>48.86%</span>
                                            <div className={styles.verticalLine}></div>
                                            <span>-2.29%</span>
                                        </div>
                                    </div>
                                </td>
                                <td className={styles.tdCellRight} align={"right"}>0.14949587</td>
                                <td className={styles.tdCellRight} >
                                    <div className={styles.burntFeeCell}>
                                        <div className={styles.brFeeTop}>
                                            <img src={fire} alt=""/>
                                            <p>0.54727044</p>
                                        </div>
                                        <div className={styles.percentage}>
                                            <ProgressBar progressColor={'#59FFA4'} bgColor={'#8D8D8E'} progress={94}
                                                         width={39}
                                                         height={3}></ProgressBar>
                                            <span>94.49%</span>

                                        </div>
                                    </div>
                                </td>


                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            </section>

        </div>
    )
}