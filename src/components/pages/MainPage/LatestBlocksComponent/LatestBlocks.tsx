import React from 'react';
import styles from './LatestBlocks.module.sass';
import {LatestBlock} from "./LatestBlock";
import {Block} from '../../../../app/models/generated'
import {Box, Skeleton} from "@chakra-ui/react";

interface LatestBlockArrayInterface {
    LatestBlockArray: Array<Block>
}

export const LatestBlocks = ({LatestBlockArray}: LatestBlockArrayInterface) => {
    return (
                <div className={styles.LatestBlockArr}>
                    {LatestBlockArray.map((block: Block) => {
                        return <LatestBlock key={block.hash}
                                            block={block}
                        />
                    })}
                </div>
    )
}