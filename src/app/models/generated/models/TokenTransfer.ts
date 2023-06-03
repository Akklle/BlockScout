/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressParam } from './AddressParam'
import type { TokenInfo } from './TokenInfo'
import type { TotalERC1155 } from './TotalERC1155'
import type { TotalERC1155Batch } from './TotalERC1155Batch'
import type { TotalERC20 } from './TotalERC20'
import type { TotalERC721 } from './TotalERC721'
import { Token } from './Token'

export type TokenTransfer = {
    block_hash?: string
    method?: string
    timestamp?: string
    type: string
    tx_hash: string
    from: AddressParam
    to: AddressParam
    total: TotalERC20 | TotalERC721 | TotalERC1155
    token: Token
    log_index: string
}
