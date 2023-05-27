import React from 'react';
import styles from './index.module.sass';
import {NavLink} from "react-router-dom";

export const Error = () => {
    return(
        <div className={styles.errorPage}>
            Something went wrong :(
            <NavLink to="/" className={styles.goBack}>Back to main</NavLink>
        </div>
    )
}