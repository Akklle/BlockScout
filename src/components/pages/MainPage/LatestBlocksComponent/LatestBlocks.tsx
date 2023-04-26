import React from 'react';
import styles from './LatestBlocks.module.sass';
import {LatestBlock, latestBlockProps} from "./LatestBlock";


interface LatestBlockArrayInterface {
    LatestBlockArray: Array<latestBlockProps>
}

export const LatestBlocks = ({LatestBlockArray}: LatestBlockArrayInterface) => {
    return (
        <div className={styles.LatestBlockArr}>
            {LatestBlockArray.map((block: latestBlockProps) => {
                return <LatestBlock
                    id={block.id}
                    date={block.date}
                    txn={block.txn}
                    reward={block.reward}
                    miner={block.miner}
                />
            })}
        </div>
    )
}