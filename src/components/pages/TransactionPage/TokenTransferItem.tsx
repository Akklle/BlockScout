import {TokenTransfer} from "../../../app/models/generated";
import styles from "./index.module.sass";
import {Icon} from "../../ui/Icon";
import classNames from "classnames";
import React from "react";
import {
    Status,
    TypeOfTransaction
} from "../MainPage/LatestTransactionComponent/LatestTransaction";
import {
    formatNumber,
    getFullTimeFromTimestamp,
    processedStringFromApi,
    round,
    stringTruncateFromCenter
} from "../../../utils";

interface wrapperTokenTransfer {
    tokenT: TokenTransfer
}

export const TokenTransferItem = (props: wrapperTokenTransfer) => {
    let currentTokenTransfer = props.tokenT
    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div className={styles.angularAvatar}></div>
                    <a className={styles.address}>{currentTokenTransfer.tx_hash}</a>
                </div>
                <TypeOfTransaction
                    theme="token_transfer">{processedStringFromApi("token_transfer")}</TypeOfTransaction>
            </td>
            <td className={styles.tdCell}>
                <div>
                    <a className={styles.ID}>-</a>
                </div>
            </td>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div className={styles.angularAvatar}></div>
                    <a className={styles.address}>{currentTokenTransfer.tx_hash}</a>
                </div>
            </td>
            <td className={styles.tdIconCell}>
                <div><Icon icon={"path"} width={24} height={6}/></div>
            </td>
            <td className={styles.tdCellW}>
                <div className={styles.addressGroup}>
                    <div
                        className={classNames(styles.angularAvatar, styles.receiver)}></div>
                    <a className={styles.address}>0x8C...1a9D</a>
                </div>
            </td>
            <td className={styles.tdCellRight} align={"right"}>{ currentTokenTransfer.total.decimals ? (formatNumber(round(Number(currentTokenTransfer.total.value) / 10 ** Number(currentTokenTransfer.total.decimals), 8))) : '-'}</td>
        </tr>
    )
}