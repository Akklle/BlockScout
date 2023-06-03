/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DecodedInputParameter } from './DecodedInputParameter'

export type DecodedInput = {
    method_call: string
    method_id: string
    parameters: Array<DecodedInputParameter>
}
