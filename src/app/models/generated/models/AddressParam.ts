/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressTag } from './AddressTag'
import type { WatchlistName } from './WatchlistName'

export type AddressParam = {
    hash: string
    implementation_name?: string
    name?: string
    is_contract?: boolean
    private_tags?: Array<AddressTag>
    watchlist_names?: Array<WatchlistName>
    public_tags?: Array<AddressTag>
    is_verified?: boolean
}
