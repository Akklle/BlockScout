import React from 'react'
import { BlockItem } from './BlockItem'
import { Block } from '../../../app/models/generated'
import styles from '../BlocksPage/index.module.sass'
interface BlockArrayInterface {
    BlockArray: Array<Block>
}

export const BlockItems = ({ BlockArray }: BlockArrayInterface) => {
    return (
        <tbody className={styles.tableBody}>
            {BlockArray.map((block: Block) => {
                return <BlockItem key={block.hash} block={block} />
            })}
        </tbody>
    )
}
