import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from './index.module.sass'
import { Search } from '../../ui/Search'
import classNames from 'classnames'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'

import { NavLink } from 'react-router-dom'
import { SmartContract, Token } from '../../../app/models/generated'
import { baseUrl } from '../MainPage/Main'

import { TokenItems } from './TokenItems'

type TokenList = {
    items: Array<Token>
    next_page_params: Record<string, string> | null
}

async function getTokens(
    setTokens: Dispatch<SetStateAction<TokenList>>,
    params: Record<string, string>
) {
    const url = baseUrl + '/tokens?'
    const searchParams = new URLSearchParams(params)

    const result: TokenList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTokens(result)
}

const previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page = 1

export const TokensPage = () => {
    const [tokenList, setTokens] = useState<TokenList>({
        items: [],
        next_page_params: null,
    })

    const previousPageHandler = () => {
        if (previousParams.length > 0) {
            page = page - 1
            currentParams = previousParams.pop() || {}
            getTokens(setTokens, currentParams)
        }
    }
    const nextPageHandler = () => {
        if (tokenList.next_page_params) {
            previousParams.push(currentParams)
            currentParams = tokenList.next_page_params
            page = page + 1
            getTokens(setTokens, currentParams)
        }
    }
    useEffect(() => {
        getTokens(setTokens, {})
    }, [])

    const isDisabled = page == 1
    return (
        <div>
            <section className={styles.searchSection}>
                <Search />
            </section>
            <section className={styles.pageSection}>
                <div className={classNames(styles.headOfPage, styles.jcsb)}>
                    <p>Tokens</p>
                    <div className={styles.paginationButtons}>
                        <button
                            className={styles.controlButton}
                            disabled={isDisabled}
                            onClick={previousPageHandler}
                        >
                            <img src={prev} alt="previous page" />
                        </button>
                        <div className={styles.pageNum}>{page}</div>
                        <button
                            className={styles.controlButton}
                            onClick={nextPageHandler}
                        >
                            <img src={next} alt="next page" />
                        </button>
                    </div>
                </div>

                <div>
                    <div className={styles.tableWrapper}>
                        <div className={styles.tableBorder}></div>
                        <table className={styles.table}>
                            <thead className={styles.tableHead}>
                                <tr>
                                    <th
                                        className={classNames(
                                            styles.thW20,
                                            styles.thDefault
                                        )}
                                    >
                                        Token
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thW20,
                                            styles.thDefault
                                        )}
                                    >
                                        Address
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thW20,
                                            styles.thDefaultRight
                                        )}
                                    >
                                        Token type
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thW20,
                                            styles.thDefaultRight
                                        )}
                                    >
                                        Holders
                                    </th>
                                </tr>
                            </thead>
                            <TokenItems
                                TokenArray={tokenList.items}
                            ></TokenItems>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
