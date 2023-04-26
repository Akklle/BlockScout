import React from 'react';
import styles from './Header.module.sass';
import logo from "../../assets/logo.png";

export const Header = () => {
    return (
        <header className={styles.header}>
            <img className={styles.logo} src={logo} alt="logo"/>

            <nav className={styles.navBar}>
                <a className={styles.navBarItem} href="">Transactions</a>
                <a className={styles.navBarItem} href="">Blocks</a>
                <a className={styles.navBarItem} href="">Tokens</a>
            </nav>
        </header>
    );
};