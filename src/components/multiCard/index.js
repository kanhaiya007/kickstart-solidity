import classNames from "classnames";
import React from "react";
import styles from "./index.module.scss";

const CardComponent = ({ className, statistics }) => {
    return (
        <div className={styles.multiCard}>
            <ul>
                {statistics.map(({ heading, subheading }, idx) => (
                    <li>
                        <h3>{heading}</h3>
                        <h4>{subheading}</h4>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CardComponent;
