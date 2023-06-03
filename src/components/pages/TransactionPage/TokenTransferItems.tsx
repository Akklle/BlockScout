import React from 'react';
import styles from "../BlocksPage/index.module.sass";
import {TokenTransfer} from "../../../app/models/generated";
import {TokenTransferItem} from "./TokenTransferItem";

interface TokenTransferArrayInterface {
    TokenTransferArray: Array<TokenTransfer>
}

export const TokenTransferItems = ({TokenTransferArray}: TokenTransferArrayInterface) => {
    return (
        <tbody className={styles.tableBody}>
        {TokenTransferArray?.map((tokenTransfer: TokenTransfer) => {
            return <TokenTransferItem key={tokenTransfer.tx_hash + tokenTransfer.log_index}
                                      tokenT={tokenTransfer}
            />
        })}
        </tbody>

    )
}
