import {
    SearchResultAddressOrContract,
    SearchResultBlock,
    SearchResultToken,
    SearchResultTransaction,
} from '../../app/models/generated'
import { Dispatch, SetStateAction } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { baseUrl } from '../../constants/api.const'

export interface ResultList {
    items: Array<
        | SearchResultToken
        | SearchResultTransaction
        | SearchResultBlock
        | SearchResultAddressOrContract
    >
    next_page_params: Record<string, string> | null
}

export async function getResults(
    setResults: Dispatch<SetStateAction<ResultList>>,
    query: string | undefined,
    params: Record<string, string>,
    navigate: NavigateFunction
) {
    const url = baseUrl + '/search?q=' + query + '&'
    const searchParams = new URLSearchParams(params)

    const fetchResult: Response = await fetch(url + searchParams.toString())
    if (fetchResult.status != 200) {
        navigate('/error')
    } else {
        const result: ResultList = await fetchResult.json()
        setResults(result)
    }
}