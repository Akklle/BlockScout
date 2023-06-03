/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { AddressParam } from './AddressParam'
import { TokenInfo } from './TokenInfo'
import { Token } from './Token'

export type Holder = {
    address: AddressParam
    value: string
    token_id?: string
    token: Token
}
