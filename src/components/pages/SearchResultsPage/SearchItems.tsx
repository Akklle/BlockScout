import React from 'react'
import {
    SearchResultAddressOrContract, SearchResultBlock,
    SearchResultToken,
    SearchResultTransaction,
} from '../../../app/models/generated'
import styles from '../BlocksPage/index.module.sass'
import { SearchItem } from './SearchItem'

interface SearchArrayInterface {
    SearchArray: Array<SearchResultToken | SearchResultTransaction | SearchResultBlock | SearchResultAddressOrContract>
}

export const SearchItems = ({ SearchArray }: SearchArrayInterface) => {
    return (
        <tbody className={styles.tableBody}>
            {SearchArray.map((searchItem: SearchResultToken | SearchResultTransaction | SearchResultBlock | SearchResultAddressOrContract) => {
                    return <SearchItem key={searchItem.type} searchItem={searchItem} />
                })}
            </tbody>
    )
}