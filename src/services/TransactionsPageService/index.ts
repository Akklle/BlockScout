import { Dispatch, SetStateAction } from 'react'
import { baseUrl } from '../../constants/api.const'
import { Transaction } from '../../app/models/generated'

export interface TransactionList {
    items: Array<Transaction>
    next_page_params: Record<string, string> | null
}

export async function getTransactions(
    setTransactions: Dispatch<SetStateAction<TransactionList>>,
    params: Record<string, string>
) {
    const url = baseUrl + '/transactions?'
    const searchParams = new URLSearchParams(params)

    const result: TransactionList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTransactions(result)
}