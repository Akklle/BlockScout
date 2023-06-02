import {TokenTransfer} from "../../../app/models/generated";
import styles from "./index.module.sass";
import {Icon} from "../../ui/Icon";
import classNames from "classnames";
import React from "react";
import {formatNumber, getFullTimeFromTimestamp, round, stringTruncateFromCenter} from "../../../utils";

interface wrapperTokenTransfer {
    tokenTransfer: TokenTransfer
}

export const TokenTransferItem = (props: wrapperTokenTransfer) => {
    let currentTokenTransfer = props.tokenTransfer
    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <div>
                    <a className={styles.address}>{stringTruncateFromCenter(currentTokenTransfer.tx_hash, 27)}</a>
                    <p className={styles.hashTime}>{getFullTimeFromTimestamp(currentTokenTransfer.timestamp)}</p>
                </div>
            </td>

            <td className={styles.tdCell}><p className={styles.method}>{currentTokenTransfer.method}</p>
            </td>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div className={styles.angularAvatar}></div>
                    <a className={styles.address}>{stringTruncateFromCenter(currentTokenTransfer.from.hash, 8)}</a>
                </div>
            </td>
            <td className={styles.tdIconCell}>
                <div><Icon icon={"path"} width={24} height={6}/></div>
            </td>
            <td className={styles.tdCellW}>
                <div className={styles.addressGroup}>
                    <div
                        className={classNames(styles.angularAvatar, styles.receiver)}></div>
                    <a className={styles.address}>{stringTruncateFromCenter(currentTokenTransfer.to.hash, 8)}</a>
                </div>
            </td>
            <td className={styles.tdCellRight} align={"right"}>{ currentTokenTransfer.total.decimals ? (formatNumber(round(Number(currentTokenTransfer.total.value) / 10 ** Number(currentTokenTransfer.total.decimals), 8))) : '-'}</td>
        </tr>
    )
}