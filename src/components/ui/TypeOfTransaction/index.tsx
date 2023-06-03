import cn from 'classnames/bind'
import styles from './index.module.sass'
import React, { ReactNode } from 'react'

const cx = cn.bind(styles)

export interface TypeOfTransactionProps {
    theme?:
        | 'token_transfer'
        | 'contract_call'
        | 'transaction'
        | 'coin_transfer'
        | string
    children: ReactNode
}

export const TypeOfTransaction = ({
    theme = 'Transaction',
    children,
}: TypeOfTransactionProps) => {
    return (
        <div
            className={cx(styles.type, {
                typeTokenTransfer: theme === 'token_transfer',
                typeContractCall: theme === 'contract_call',
                typeTransaction: theme === 'transaction',
                typeCoinTransfer: theme === 'coin_transfer',
                typeCommon: ![
                    'token_transfer',
                    'contract_call',
                    'transaction',
                    'coin_transfer',
                ].includes(theme),
            })}>
            {children}
        </div>
    )
}