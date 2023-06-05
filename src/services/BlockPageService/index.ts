import { Dispatch, SetStateAction } from 'react'
import { TransactionList } from '../TransactionsPageService'
import { baseUrl } from '../../constants/api.const'
import { Block } from '../../app/models/generated'
import { NavigateFunction } from 'react-router-dom'

export async function getBlock(
    setBlock: Dispatch<SetStateAction<Block>>,
    number: string | undefined,
    navigate: NavigateFunction
) {
    const url = baseUrl + '/blocks' + '/' + number
    const fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        navigate('/error')
    } else {
        const result: Block = await fetchResult.json()
        setBlock(result)
    }
}

export async function getTransactions(
    setTransactions: Dispatch<SetStateAction<TransactionList>>,
    number: string | undefined,
    params: Record<string, string>
) {
    const url = baseUrl + '/blocks/' + number + '/transactions?'
    const searchParams = new URLSearchParams(params)

    const result: TransactionList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTransactions(result)
}