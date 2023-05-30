import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import styles from "./index.module.sass";
import {Search} from "../../ui/Search";
import classNames from "classnames";
import prev from "../../../assets/arrow_prev.svg";
import next from "../../../assets/arrow_next.svg";

import {NavLink} from "react-router-dom";
import {Token} from "../../../app/models/generated";
import {baseUrl} from "../MainPage/Main";

import {TokenItems} from './TokenItems';

type TokenList = {
    items: Array<Token>,
    next_page_params: any
}

async function getTokens(setTokens: Dispatch<SetStateAction<TokenList>>) {
    let url = baseUrl + '/tokens'
    let result: TokenList = await (await fetch(url)).json()
    setTokens(result)
}

export const Tokens = () => {
    const [tokenList, setTokens] = useState<TokenList>({items: [], next_page_params: null});
    useEffect(() => {
        getTokens(setTokens)
    }, [])
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
                            <TokenItems TokenArray={tokenList.items}></TokenItems>
                        </table>
                    </div>
                </div>


            </section>

        </div>
    )
}