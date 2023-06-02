/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const initialToken:Token = {
    name: '',
    decimals: '',
    symbol: '',
    address: '',
    type: '',
    holders: 0,
    exchange_rate: '',
    total_supply: ''

}
export type Token = {
    name: string;
    decimals: string;
    symbol: string;
    address: string;
    type: string;
    holders: number;
    exchange_rate: string;
    total_supply: string;
};
