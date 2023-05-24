import React from 'react';
import styles from "./index.module.sass";
import {Search} from "../../ui/Search";
import classNames from "classnames";
import prev from "../../../assets/arrow_prev.svg";
import next from "../../../assets/arrow_next.svg";
import ProgressBar from "../../ui/ProgressBar";
import fire from "../../../assets/fire.svg";
import {NavLink} from "react-router-dom";

export const Tokens = () => {
    const isDisabled = true
    return (
        <div>
            <section className={styles.searchSection}>
                <Search/>
            </section>
            <section className={styles.pageSection}>
                <div className={classNames(styles.headOfPage, styles.jcsb)}>
                    <p>Tokens</p>
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
                                <th className={classNames(styles.thW20, styles.thDefault)}>Token</th>
                                <th className={classNames(styles.thW20, styles.thDefault)}>Address</th>
                                <th className={classNames(styles.thW20, styles.thDefaultRight)}>Token type</th>
                                <th className={classNames(styles.thW20, styles.thDefaultRight)}>Holders</th>
                            </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                            <tr className={styles.tableRow}>
                                <td className={styles.tdCell}>
                                    <NavLink className={classNames(styles.address, styles.fontWeight500)} to="/">hUSDC.cc
                                        (hUSDC)</NavLink>
                                </td>
                                <td className={styles.tdCell}>
                                    <NavLink className={styles.address} to="/">0x37...2394</NavLink>
                                </td>
                                <td className={styles.tdCellRight} align={"right"}><p
                                    className={styles.method}>ERC-20</p></td>
                                <td className={styles.tdCellRight} align={"right"}>4,629,701</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            </section>

        </div>
    )
}