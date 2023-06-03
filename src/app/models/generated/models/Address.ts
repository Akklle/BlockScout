/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressTag } from './AddressTag'
import type { TokenInfo } from './TokenInfo'
import type { WatchlistName } from './WatchlistName'
import { Token } from './Token'


export const initialAddress: Address = {
    hash: ''
}

export type Address = {
    creator_address_hash?: string
    creation_tx_hash?: string
    token?: TokenInfo
    coin_balance?: string
    exchange_rate?: string
    implementation_address?: string
    block_number_balance_updated_at?: number
    hash: string
    implementation_name?: string
    name?: string
    is_contract?: boolean
    private_tags?: Array<AddressTag>
    watchlist_names?: Array<WatchlistName>
    public_tags?: Array<AddressTag>
    is_verified?: boolean
}
