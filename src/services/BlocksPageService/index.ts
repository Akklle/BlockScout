import { Dispatch, SetStateAction } from 'react'
import { baseUrl } from '../../constants/api.const'
import { Block } from '../../app/models/generated'

export interface BlockList {
    items: Array<Block>
    next_page_params: Record<string, string> | null
}

export async function getBlocks(
    setBlocks: Dispatch<SetStateAction<BlockList>>,
    params: Record<string, string>
) {
    const url = baseUrl + '/blocks?'
    const searchParams = new URLSearchParams(params)

    const result: BlockList = await (
        await fetch(url + searchParams.toString())
    ).json()
    setBlocks(result)
}