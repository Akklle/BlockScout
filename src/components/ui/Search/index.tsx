import styles from './index.module.sass'
import { Icon } from '../Icon'
import React from 'react'

export const Search = () => {
    return (
        <div className={styles.searchBlock}>
            <input
                className={styles.input}
                type="text"
                placeholder="Search by address / txn hash / block / token..."
            />
            <div>
                <button className={styles.search}>
                    <Icon icon={'search'} />
                </button>
            </div>
        </div>
    )
}
