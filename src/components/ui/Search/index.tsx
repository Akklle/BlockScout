import styles from './index.module.sass'
import { Icon } from '../Icon'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const Search = () => {
    const navigate = useNavigate()
    const[searchQuery, setSearchQuery] = useState("");
    function handleSearch() {
        navigate('/search-results/' + searchQuery)
    }
    return (
        <div className={styles.searchBlock}>
            <input
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value)}}
                className={styles.input}
                type="text"
                placeholder="Search by address / txn hash / block / token..."
            />
            <div>
                <button className={styles.search} onClick={handleSearch}>
                    <Icon icon={'search'} />
                </button>
            </div>
        </div>
    )
}
