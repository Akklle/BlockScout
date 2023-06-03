import React from 'react'
import styles from './Footer.module.sass'
import { Icon } from '../ui/Icon'

export const Footer = () => {
    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.line}></div>
                <div className={styles.footerInfo}>
                    <nav className={styles.navIcon}>
                        <Icon icon={'gitHub'} />
                        <Icon icon={'twitter'} />
                    </nav>
                    <div className={styles.rightInfo}>
                        <p className={styles.info}>
                            <span>Blockscout</span> is a tool for inspecting and
                            analyzing EVM based blockchains.
                        </p>
                        <p className={styles.info}>
                            Blockchain explorer for Ethereum Networks.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
