import React from "react";
import styles from "./index.module.scss";
import { FiGithub, FiLogIn } from "react-icons/fi";
import Image from "next/image";

const Header = () => {
    return (
        <div className={styles.header}>
            <FiGithub className={styles.github} />
            <p className={styles.logo}>CryptoDonor</p>
            <FiLogIn className={styles.github} />
        </div>
    );
};

export default Header;
