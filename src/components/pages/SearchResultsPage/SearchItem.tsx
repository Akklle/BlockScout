import styles from './index.module.sass'
import React from 'react'
import {
    Block,
    SearchResultAddressOrContract,
    SearchResultBlock,
    SearchResultToken,
    SearchResultTransaction,
} from '../../../app/models/generated'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

interface wrapperSearchItem {
    searchItem:
        | SearchResultToken
        | SearchResultTransaction
        | SearchResultBlock
        | SearchResultAddressOrContract
}

export const SearchItem = (props: wrapperSearchItem) => {
    const currentSearchItem = props.searchItem
    const addressField =
        'block_hash' in currentSearchItem
            ? currentSearchItem.block_hash
            : 'tx_hash' in currentSearchItem
            ? ''
            : currentSearchItem.type == 'address'
            ? ''
            : currentSearchItem.address
    const type = currentSearchItem.type
    const tokenName =
        'name' in currentSearchItem && 'symbol' in currentSearchItem
            ? currentSearchItem.name + ' (' + currentSearchItem.symbol + ')'
            : null
    const blockName =
        'block_number' in currentSearchItem
            ? currentSearchItem.block_number
            : null
    const txnName =
        'tx_hash' in currentSearchItem ? currentSearchItem.tx_hash : null
    const addressName =
        'address' in currentSearchItem ? currentSearchItem.address : null
    const url = 'token_url' in currentSearchItem ? currentSearchItem.token_url : currentSearchItem.url

    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <NavLink
                    className={classNames(styles.address, styles.fontWeight500)}
                    to={url}>
                    {tokenName ?? blockName ?? txnName ?? addressName}
                </NavLink>
            </td>
            <td className={styles.tdCell}>{addressField}</td>
            <td className={styles.tdCellRight} align={'right'}>{currentSearchItem.type}</td>
        </tr>
    )
}
