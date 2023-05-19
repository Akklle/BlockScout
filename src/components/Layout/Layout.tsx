import react from 'react';
import {Header} from "../HeaderComponent/Header";
import {Outlet} from "react-router-dom";
import {Footer} from "../FooterComponent/Footer";
import styles from "./index.module.sass"

export const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )

}