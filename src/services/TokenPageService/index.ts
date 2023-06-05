import { Dispatch, SetStateAction } from 'react'
import {
    Holder,
    SmartContract,
    Token,
    TokenCounters,
} from '../../app/models/generated'
import { NavigateFunction } from 'react-router-dom'
import { baseUrl } from '../../constants/api.const'
import { TokenTransferList } from '../TransactionPageService'

export async function getToken(
    setToken: Dispatch<SetStateAction<Token>>,
    address: string | undefined,
    navigate: NavigateFunction
) {
    const url = baseUrl + '/tokens/' + address
    const fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        navigate('/error')
    } else {
        const result: Token = await fetchResult.json()
        setToken(result)
    }
}

export async function getTokenTransfers(
    setTokenTransfers: Dispatch<SetStateAction<TokenTransferList>>,
    address: string | undefined,
    params: Record<string, string>
) {
    const url = baseUrl + '/tokens/' + address + '/transfers?'
    const searchParams = new URLSearchParams(params)

    const result: TokenTransferList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTokenTransfers(result)
}

export interface HolderList {
    items: Array<Holder>
    next_page_params: Record<string, string> | null
}

export async function getHolders(
    setHolders: Dispatch<SetStateAction<HolderList>>,
    address: string | undefined,
    params: Record<string, string>
) {
    const url = baseUrl + '/tokens/' + address + '/holders?'
    const searchParams = new URLSearchParams(params)

    const result: HolderList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setHolders(result)
}

export async function getSmartContract(
    setSmartContract: Dispatch<SetStateAction<SmartContract | undefined>>,
    address: string | undefined
) {
    const url = baseUrl + '/smart-contracts/' + address
    const fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        setSmartContract(undefined)
    } else {
        const result: SmartContract = await fetchResult.json()
        setSmartContract(result)
    }
}

export async function getCounters(
    setCounters: Dispatch<SetStateAction<TokenCounters | undefined>>,
    address: string | undefined
) {
    const url = baseUrl + '/tokens/' + address + '/counters'
    const fetchResult: Response = await fetch(url)
    if (fetchResult.status != 200) {
        setCounters(undefined)
    } else {
        const result: TokenCounters = await fetchResult.json()
        setCounters(result)
    }
}