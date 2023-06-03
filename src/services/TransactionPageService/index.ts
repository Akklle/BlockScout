import { Dispatch, SetStateAction } from 'react'
import { TokenTransfer, Transaction } from '../../app/models/generated'
import { NavigateFunction } from 'react-router-dom'
import { baseUrl } from '../../constants/api.const'

export async function getTransaction(
    setTransaction: Dispatch<SetStateAction<Transaction>>,
    address: string | undefined,
    navigate: NavigateFunction
) {
    let url = `${baseUrl}/transactions/${address}`
    let fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        navigate('/error')
    } else {
        let result: Transaction = await fetchResult.json()
        setTransaction(result)
    }
}

export interface TokenTransferList {
    items: Array<TokenTransfer>
    next_page_params: Record<string, string> | null
}

export async function getTokenTransfers(
    setTokenTransfers: Dispatch<SetStateAction<TokenTransferList>>,
    address: string | undefined,
    params: Record<string, string>
) {
    let url = baseUrl + '/transactions/' + address + '/token-transfers?'
    let searchParams = new URLSearchParams(params)

    let result: TokenTransferList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTokenTransfers(result)
}