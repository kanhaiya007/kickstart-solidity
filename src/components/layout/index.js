import React from "react";
import Header from "../header";
import styles from "./index.module.scss";

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.children}>{children}</div>
        </div>
    );
};

export default Layout;
