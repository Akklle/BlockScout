import React, { ReactNode } from 'react'
import styles from './index.module.sass'
import cn from 'classnames/bind'

const cx = cn.bind(styles)

export interface StatusProps {
    theme?: 'ok' | 'error' | string
    children?: ReactNode
}

export const Status = ({ theme = 'ok' }: StatusProps) => {
    return (
        <div
            className={cx(styles.status, {
                statusSuccess: theme === 'ok',
                statusFailed: theme === 'error',
            })}>
            {theme === 'ok' ? 'Success' : 'Failed'}
        </div>
    )
}