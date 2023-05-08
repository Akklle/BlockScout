import {GasPrices} from "./GasPrices";

export const initialStats: Stats = {
    average_block_time: -1,
    "total_blocks": '',
    "total_addresses": '',
    "total_transactions": '',
    "coin_price": '',
    "total_gas_used": '',
    "transactions_today": '',
    "gas_used_today": '',
    "gas_prices": null,
    "static_gas_price": '',
    "market_cap": '',
    "network_utilization_percentage": -1
}
export interface Stats {
    average_block_time: number,
    "total_blocks": string,
    "total_addresses": string,
    "total_transactions": string,
    "coin_price": string,
    "total_gas_used": string,
    "transactions_today": string,
    "gas_used_today": string,
    "gas_prices": GasPrices | null,
    "static_gas_price": string,
    "market_cap": string,
    "network_utilization_percentage": number
}