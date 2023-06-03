import React, { useEffect, useState } from 'react'
import styles from '../BlocksPage/index.module.sass'
import { Search } from '../../ui/Search'
import prev from '../../../assets/arrow_prev.svg'
import next from '../../../assets/arrow_next.svg'
import classNames from 'classnames'
import { Block } from '../../../app/models/generated'
import { BlockItems } from './BlockItems'
import { getBlocks } from '../../../services/BlocksPageService'

export interface BlockList {
    items: Array<Block>
    next_page_params: Record<string, string> | null
}

const previousParams: Record<string, string>[] = []
let currentParams: Record<string, string> = {}
let page = 1

export const BlocksPage = () => {
    const [blockList, setBlocks] = useState<BlockList>({
        items: [],
        next_page_params: null,
    })
    const previousPageHandler = () => {
        if (previousParams.length > 0) {
            page = page - 1
            currentParams = previousParams.pop() || {}
            getBlocks(setBlocks, currentParams)
        }
    }
    const nextPageHandler = () => {
        if (blockList.next_page_params) {
            previousParams.push(currentParams)
            currentParams = blockList.next_page_params
            page = page + 1
            getBlocks(setBlocks, currentParams)
        }
    }
    useEffect(() => {
        getBlocks(setBlocks, {})
    }, [])
    const isDisabled = page == 1
    return (
        <div>
            <section className={styles.searchSection}>
                <Search />
            </section>
            <section className={styles.pageSection}>
                <div className={classNames(styles.headOfPage, styles.jcsb)}>
                    <p>Blocks</p>
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
                                            styles.thBlock,
                                            styles.thDefault
                                        )}
                                    >
                                        Block
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thSize,
                                            styles.thDefault
                                        )}
                                    >
                                        Size, bytes
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thW8,
                                            styles.thDefault
                                        )}
                                    >
                                        Validator
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thTxn,
                                            styles.thDefault
                                        )}
                                    >
                                        Txn
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thGas,
                                            styles.thDefault
                                        )}
                                    >
                                        Gas used
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thW8,
                                            styles.thDefaultRight
                                        )}
                                    >
                                        Reward ETH
                                    </th>
                                    <th
                                        className={classNames(
                                            styles.thW10,
                                            styles.thDefaultRight
                                        )}
                                    >
                                        Burnt fees ETH
                                    </th>
                                </tr>
                            </thead>
                            <BlockItems
                                BlockArray={blockList.items}
                            ></BlockItems>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
