/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressParam } from './AddressParam';

export type TransactionReward = {
    types: Record<string, any>;
    emission_reward: string;
    block_hash: string;
    from: AddressParam;
    to: AddressParam;
};
