import React, { useEffect, useState } from 'react'
import styles from './index.module.sass'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'

import { SearchItems } from './SearchItems'
import { getResults, ResultList } from '../../../services/SearchResultsPage'

const previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page = 1

export const SearchResultsPage = () => {
    const navigate = useNavigate()
    const { query } = useParams()
    const [results, setResults] = useState<ResultList>({
        items: [],
        next_page_params: null,
    })
    useEffect(() => {
        getResults(setResults, query, {}, navigate)
    }, [])

    const isDisabled = page == 1
    const previousPageHandler = () => {
        if (previousParams.length > 0) {
            page = page - 1
            currentParams = previousParams.pop() || {}
            getResults(setResults, query, currentParams, navigate)
        }
    }
    const nextPageHandler = () => {
        if (results.next_page_params) {
            previousParams.push(currentParams)
            currentParams = results.next_page_params
            page = page + 1
            getResults(setResults, query, currentParams, navigate)
        }
    }
    const resultsCounter =
        results.items.length != 0
            ? results.next_page_params
                ? '50+'
                : results.items.length
            : 0
    return (
        <div className={styles.pageSection}>
            <div className={styles.headOfPage}>
                <p>Search results</p>
            </div>
            <p className={styles.resultCount}>
                Found {resultsCounter} matching{' '}
                {resultsCounter == 1 ? 'result' : 'results'} for “{query}”
            </p>
            {resultsCounter && (
                <div className={styles.transactions}>
                    <div className={styles.paginationButtons}>
                        <button
                            className={styles.controlButton}
                            disabled={isDisabled}
                            onClick={previousPageHandler}>
                            <img src={prev} alt="previous page" />
                        </button>
                        <div className={styles.pageNum}>{page}</div>
                        <button
                            className={styles.controlButton}
                            disabled={!results.next_page_params}
                            onClick={nextPageHandler}>
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
                                            styles.th40,
                                            styles.thDefault
                                        )}>
                                        Search result
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thW40,
                                            styles.thDefault
                                        )}></th>
                                    <th
                                        className={classNames(
                                            styles.thW20,
                                            styles.thDefaultRight
                                        )}>
                                        Type
                                    </th>
                                </tr>
                            </thead>
                            <SearchItems
                                SearchArray={results.items}></SearchItems>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
