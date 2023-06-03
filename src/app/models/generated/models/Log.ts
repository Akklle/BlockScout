/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressParam } from './AddressParam'
import type { DecodedInputLog } from './DecodedInputLog'

export type Log = {
    tx_hash: string
    address: AddressParam
    topics: Array<string>
    data: string
    index: number
    decoded?: DecodedInputLog
}
