import { Dispatch, SetStateAction } from 'react'
import { Stats } from '../../app/models/Stats'
import { baseUrl } from '../../constants/api.const'
import { Block, Transaction } from '../../app/models/generated'

export async function getStats(setStats: Dispatch<SetStateAction<Stats>>) {
    const url = baseUrl + '/stats'
    const result: Stats = await (await fetch(url)).json()
    setStats(result)
}

export async function getBlocks(
    setBlocks: Dispatch<SetStateAction<Array<Block>>>
) {
    const url = baseUrl + '/main-page/blocks'
    const result: Array<Block> = await (await fetch(url)).json()
    setBlocks(result)
}

export async function getTransactions(
    setTransactions: Dispatch<SetStateAction<Array<Transaction>>>
) {
    const url = baseUrl + '/main-page/transactions'
    const result: Array<Transaction> = await (await fetch(url)).json()
    setTransactions(result)
}