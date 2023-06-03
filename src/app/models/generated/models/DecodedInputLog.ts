/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DecodedInputLogParameter } from './DecodedInputLogParameter'

export type DecodedInputLog = {
    method_call: string
    method_id: string
    parameters: Array<DecodedInputLogParameter>
}
