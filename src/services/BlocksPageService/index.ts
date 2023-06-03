import { Dispatch, SetStateAction } from 'react'
import { BlockList } from '../../components/pages/BlocksPage'
import { baseUrl } from '../../constants/api.const'

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