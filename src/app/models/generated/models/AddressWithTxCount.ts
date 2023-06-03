/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address'

export type AddressWithTxCount = Address & {
    tx_count: string
}
