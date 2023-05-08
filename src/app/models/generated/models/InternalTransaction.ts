/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressParam } from './AddressParam';

export type InternalTransaction = {
    error?: string;
    success: boolean;
    type: string;
    transaction_hash: string;
    from: AddressParam;
    to: AddressParam;
    created_contract: AddressParam;
    value: number;
    index: number;
    block: number;
    timestamp: string;
};
