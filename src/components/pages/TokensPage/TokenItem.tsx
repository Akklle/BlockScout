import React, {ReactNode} from 'react';
import styles from "../TokensPage/index.module.sass";
import classNames from 'classnames'

import {Token} from "../../../app/models/generated"
import {NavLink} from "react-router-dom";
import {formatNumber, stringTruncateFromCenter} from "../../../services/dataProsessing";

interface wrapperToken {
    token: Token
}

export const TokenItem = (props: wrapperToken) => {
    let currentToken = props.token
    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <NavLink className={classNames(styles.address, styles.fontWeight500)} to="/">{currentToken.name ? currentToken.name : stringTruncateFromCenter(currentToken.address, 20)}</NavLink>
            </td>
            <td className={styles.tdCell}>
                <NavLink className={styles.address} to="/">{stringTruncateFromCenter(currentToken.address, 8)}</NavLink>
            </td>
            <td className={styles.tdCellRight} align={"right"}><p
                className={styles.method}>{currentToken.type}</p></td>
            <td className={styles.tdCellRight} align={"right"}>{formatNumber(currentToken.holders)}</td>
        </tr>
    )
}