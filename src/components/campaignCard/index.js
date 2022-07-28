import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";

const CampaignCard = () => {
    return (
        <div className={styles.campaignCard}>
            <Image
                src={
                    "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2FtcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                }
                height={150}
                width={250}
            />
            <h2>The Game Master Screen by Wyrmwood</h2>
            <p>
                This modular solid wood screen is packed full of features to
                make it not just a wall, but a gateway to endless possibilities.
            </p>
            <p className={styles.label}>By Wyrmwood Gaming</p>
        </div>
    );
};

export default CampaignCard;
