import { Dispatch, SetStateAction } from 'react'
import { baseUrl } from '../../constants/api.const'
import { Token } from '../../app/models/generated'

export interface TokenList {
    items: Array<Token>
    next_page_params: Record<string, string> | null
}

export async function getTokens(
    setTokens: Dispatch<SetStateAction<TokenList>>,
    params: Record<string, string>
) {
    const url = baseUrl + '/tokens?'
    const searchParams = new URLSearchParams(params)

    const result: TokenList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setTokens(result)
}