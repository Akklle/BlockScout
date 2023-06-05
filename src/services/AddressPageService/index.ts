import { Dispatch, SetStateAction } from 'react'
import { Address, AddressCounters } from '../../app/models/generated'
import { NavigateFunction } from 'react-router-dom'
import { baseUrl } from '../../constants/api.const'
import { TokenTransferList } from '../TransactionPageService'
import { TransactionList } from '../TransactionsPageService'

export async function getAddress(
    setAddress: Dispatch<SetStateAction<Address>>,
    address: string | undefined,
    navigate: NavigateFunction
) {
    const url = baseUrl + '/addresses/' + address
    const fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        navigate('/error')
    } else {
        const result: Address = await fetchResult.json()
        setAddress(result)
    }
}

export async function getCounters(
    setCounters: Dispatch<SetStateAction<AddressCounters | undefined>>,
    address: string | undefined
) {
    const url = baseUrl + '/addresses/' + address + '/counters'
    const fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        setCounters(undefined)
    } else {
        const result: AddressCounters = await fetchResult.json()
        setCounters(result)
    }
}

export async function getTokenTransfers(
    setTokenTransfers: Dispatch<SetStateAction<TokenTransferList>>,
    address: string | undefined,
    params: Record<string, string>
) {
    const url = baseUrl + '/addresses/' + address + '/token-transfers?'
    const searchParams = new URLSearchParams(params)

    const result: TokenTransferList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTokenTransfers(result)
}

export async function getTransactions(
    setTransactions: Dispatch<SetStateAction<TransactionList>>,
    address: string | undefined,
    params: Record<string, string>
) {
    const url = baseUrl + '/addresses/' + address + '/transactions?'
    const searchParams = new URLSearchParams(params)

    const result: TransactionList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTransactions(result)
}