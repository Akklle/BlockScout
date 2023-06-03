/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NFTInstance } from './NFTInstance'
import type { Token } from './Token'

export type TokenBalance = {
    token_instance?: NFTInstance
    value: string
    token_id: string
    token: Token
}
