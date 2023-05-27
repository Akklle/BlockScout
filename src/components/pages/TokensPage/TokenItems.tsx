import React from 'react';
import {TokenItem} from "./TokenItem";
import {Token} from '../../../app/models/generated'
import styles from "../TokensPage/index.module.sass";

interface TokenArrayInterface {
    TokenArray: Array<Token>
}

export const TokenItems = ({TokenArray}: TokenArrayInterface) => {
    console.log(TokenArray)
    return (
        <tbody className={styles.tableBody}>
        {TokenArray.map((token: Token) => {
            return <TokenItem key={token.address}
                              token={token}
            />
        })}
        </tbody>

    )
}