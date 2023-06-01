import React, {ReactNode} from 'react';
import styles from "../BlocksPage/index.module.sass";
import classNames from 'classnames'
import ProgressBar from "../../ui/ProgressBar";
import fire from "../../../assets/fire.svg";


import {Block} from "../../../app/models/generated"
import {NavLink} from "react-router-dom";
import {calculateReward, stringTruncateFromCenter, getTimeFromTimestamp, formatNumber} from "../../../utils";

interface wrapperBlock {
    block: Block
}

export const BlockItem = (props: wrapperBlock) => {
    let currentBlock = props.block
    return (<tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <div>
                    <NavLink className={classNames(styles.address, styles.fontWeight500)}
                             to={"/block/" + currentBlock.height}>{currentBlock.height}</NavLink>
                    <p className={styles.hashTime}>{getTimeFromTimestamp(currentBlock.timestamp)}</p>
                </div>
            </td>
            <td className={styles.tdCell}>
                {formatNumber(currentBlock.size)}
            </td>
            <td className={styles.tdCell}><a
                className={styles.address}>{stringTruncateFromCenter(currentBlock.miner?.hash, 8)}</a>
            </td>
            <td className={styles.tdCell}>{currentBlock.tx_count}
            </td>
            <td className={styles.tdCell}>
                <div className={styles.gasUsedCell}>
                    <p>{formatNumber(currentBlock.gas_used)}</p>
                    <div className={styles.percentage}>
                        <ProgressBar progressColor={'#3CE2EC'} bgColor={'#8D8D8E'}
                                     progress={currentBlock.gas_used_percentage ? currentBlock.gas_used_percentage : 0}
                                     width={39}
                                     height={3}></ProgressBar>
                        <span>{currentBlock.gas_used_percentage ? currentBlock.gas_used_percentage.toFixed(2) : 0}%</span>
                        <div className={styles.verticalLine}></div>
                        <span>{currentBlock.gas_target_percentage ? currentBlock.gas_target_percentage.toFixed(2) : 0}%</span>
                    </div>
                </div>
            </td>
            <td className={styles.tdCellRight}
                align={"right"}>{(calculateReward(currentBlock.rewards) / 10 ** 18).toFixed(8)}</td>
            <td className={styles.tdCellRight}>
                <div className={styles.burntFeeCell}>
                    <div className={styles.brFeeTop}>
                        <img src={fire} alt=""/>
                        <p>{currentBlock.burnt_fees ? (currentBlock.burnt_fees / 10 ** 18).toFixed(8) : 0}</p>
                    </div>
                    <div className={styles.percentage}>
                        <ProgressBar progressColor={'#59FFA4'} bgColor={'#8D8D8E'}
                                     progress={currentBlock.burnt_fees_percentage ? currentBlock.burnt_fees_percentage : 0}
                                     width={39}
                                     height={3}></ProgressBar>
                        <span>{currentBlock.burnt_fees_percentage ? currentBlock.burnt_fees_percentage.toFixed(2) : 0}%</span>
                    </div>
                </div>
            </td>
        </tr>
    )
}