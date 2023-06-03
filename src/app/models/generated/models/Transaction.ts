/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressParam } from './AddressParam'
import type { DecodedInput } from './DecodedInput'
import type { Fee } from './Fee'
import type { RevertReasonAsMap } from './RevertReasonAsMap'
import type { TokenTransfer } from './TokenTransfer'

export const initialTransaction: Transaction = {
    confirmations: 0,
    gas_limit: '',
    gas_price: '',
    hash: '',
    nonce: 0,
    raw_input: '',
    result: '',
    tx_types: [''],
    value: '',
}
export type Transaction = {
    hash: string
    result: string
    confirmations: number
    status?: string
    block?: number
    timestamp?: string
    confirmation_duration?: Record<string, any>
    from?: AddressParam
    to?: AddressParam
    created_contract?: AddressParam
    value: string
    fee?: Fee
    gas_price: string
    type?: number
    gas_used?: string
    gas_limit: string
    max_fee_per_gas?: string
    max_priority_fee_per_gas?: string
    priority_fee?: string
    base_fee_per_gas?: string
    tx_burnt_fee?: string
    nonce: number
    position?: number
    revert_reason?: RevertReasonAsMap | DecodedInput
    raw_input: string
    decoded_input?: DecodedInput
    token_transfers?: Array<TokenTransfer>
    token_transfers_overflow?: boolean
    exchange_rate?: number
    method?: string
    tx_types: Array<string>
    tx_tag?: string
}
