import React from 'react'
import styles from './Header.module.sass'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import classNames from 'classnames'

export const Header = () => {
    return (
        <header>
            <div className={styles.header}>
                <NavLink to="/">
                    <img className={styles.logo} src={logo} alt="logo" />
                </NavLink>

                <nav className={styles.navBar}>
                    <NavLink
                        className={({ isActive }) =>
                            classNames(
                                styles.navBarItem,
                                isActive && styles.navBarItemActive
                            )
                        }
                        to="/transactions"
                    >
                        Transactions
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            classNames(
                                styles.navBarItem,
                                isActive && styles.navBarItemActive
                            )
                        }
                        to="/blocks"
                    >
                        Blocks
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            classNames(
                                styles.navBarItem,
                                isActive && styles.navBarItemActive
                            )
                        }
                        to="/tokens"
                    >
                        Tokens
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}
