import React from 'react';
import styles from './LatestBlocks.module.sass';
import {Icon} from "../../../ui/Icon";
import {Block} from '../../../../app/models/generated'
import {calculateReward, getTimeFromTimestamp, stringTruncateFromCenter} from "../../../../services/dataProsessing";
import {Box, Skeleton} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";


interface wrapperBlock {
    block: Block
}

export const LatestBlock = (props: wrapperBlock) => {
    let currentBlock = props.block
    return (
                <div className={styles.pop}>
                    <div className={styles.latestBlock}>
                        <div className={styles.blockHead}>
                            <div className={styles.blockHeadMain}>
                                <Icon icon={"totalBlocks"}/>

                                <NavLink className={styles.blockId} to={"/block/" + currentBlock.height}>
                                    {currentBlock.height}
                                </NavLink>
                            </div>
                            <h2 className={styles.blockDate}>
                                {getTimeFromTimestamp(currentBlock.timestamp)}
                            </h2>
                        </div>
                        <div className={styles.underBlockInfo}>
                            <div className={styles.underTypeInfo}>
                                <p className={styles.type}>Txn</p>
                                <p className={styles.type}>Reward</p>
                                <p className={styles.type}>Miner</p>
                            </div>
                            <div className={styles.underInfo}>
                                <p className={styles.type}>{currentBlock.tx_count}</p>
                                <p className={styles.type}>{calculateReward(currentBlock.rewards) / 10 ** 18}</p>
                                <p className={styles.minerValue}>{stringTruncateFromCenter(currentBlock.miner?.hash, 8)}</p>
                            </div>
                        </div>
                    </div>
                </div>
    )
}