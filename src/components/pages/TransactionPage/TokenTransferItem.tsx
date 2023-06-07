import { TokenTransfer } from '../../../app/models/generated'
import styles from './index.module.sass'
import { Icon } from '../../ui/Icon'
import classNames from 'classnames'
import React from 'react'
import {
    formatNumber,
    processedStringFromApi,
    round,
    stringTruncateFromCenter,
} from '../../../utils'
import { TypeOfTransaction } from '../../ui/TypeOfTransaction'
import { NavLink } from 'react-router-dom'

interface wrapperTokenTransfer {
    tokenT: TokenTransfer
}

export const TokenTransferItem = (props: wrapperTokenTransfer) => {
    const currentTokenTransfer = props.tokenT

    const value = currentTokenTransfer.total.decimals
        ? formatNumber(
              round(
                  Number(currentTokenTransfer.total.value) /
                      10 ** Number(currentTokenTransfer.total.decimals),
                  8
              )
          )
        : '-'

    return (
        <tr className={styles.tableRow}>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div className={styles.angularAvatar}></div>
                    <NavLink to={'/token/' + currentTokenTransfer.token.address} className={styles.address}>
                        {currentTokenTransfer.token.name}
                    </NavLink>
                </div>
                <div className={styles.typeTag}>
                    <TypeOfTransaction theme={currentTokenTransfer.type}>
                        {processedStringFromApi(currentTokenTransfer.type)}
                    </TypeOfTransaction>
                </div>
            </td>
            <td className={styles.tdCell}>
                <div>
                    <p className={styles.ID}>
                        {currentTokenTransfer.total.token_id}
                    </p>
                </div>
            </td>
            <td className={styles.tdCell}>
                <div className={styles.addressGroup}>
                    <div className={styles.angularAvatar}></div>
                    <NavLink to={'/address/' + currentTokenTransfer.from} className={styles.address}>
                        {stringTruncateFromCenter(
                            currentTokenTransfer.from.hash,
                            12
                        )}
                    </NavLink>
                </div>
            </td>
            <td className={styles.tdIconCell}>
                <div>
                    <Icon icon={'path'} width={24} height={6} color={'#3CE2EC'} />
                </div>
            </td>
            <td className={styles.tdCellW}>
                <div className={styles.addressGroup}>
                    <div
                        className={classNames(
                            styles.angularAvatar,
                            styles.receiver
                        )}></div>
                    <NavLink to={'/address' + currentTokenTransfer.to} className={styles.address}>
                        {stringTruncateFromCenter(
                            currentTokenTransfer.to.hash,
                            12
                        )}
                    </NavLink>
                </div>
            </td>
            <td className={styles.tdCellRight} align={'right'}>
                {value}
            </td>
        </tr>
    )
}
