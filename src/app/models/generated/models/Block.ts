/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressParam } from './AddressParam'
import type { Reward } from './Reward'

export const initialBlock: Block = {
    height: 0,
    timestamp: '',
    tx_count: 0,
    miner: null,
    size: 0,
    hash: '',
    parent_hash: '',
    difficulty: 0,
    total_difficulty: 0,
    gas_used: 0,
    gas_limit: 0,
    nonce: '',
}
export type Block = {
    height: number
    timestamp: string
    tx_count: number
    miner: AddressParam | null
    size: number
    hash: string
    parent_hash: string
    difficulty: number
    total_difficulty: number
    gas_used: number
    gas_limit: number
    nonce: string
    base_fee_per_gas?: number
    burnt_fees?: number
    priority_fee?: number
    extra_data?: string
    uncles_hashes?: Record<string, any>
    state_root?: string
    rewards?: Array<Reward>
    gas_target_percentage?: number
    gas_used_percentage?: number
    burnt_fees_percentage?: number
    type?: string
    tx_fees?: number
}
