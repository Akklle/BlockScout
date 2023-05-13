import styles from "./index.module.sass";
import search from "../../../assets/search.svg";
import React from "react";

export const Search = () => {
    return (
        <div className={styles.searchBlock}>

            <input className={styles.input} type="text"
                   placeholder="Search by address / txn hash / block / token..."/>
            <div>
                <button className={styles.search}>
                    <img className={styles.searchIcon} src={search} alt="wallet"/>
                </button>
            </div>
        </div>
    )
}