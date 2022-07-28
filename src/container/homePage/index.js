import React from "react";
import CampaignCard from "../../components/campaignCard";
import CardComponent from "../../components/multiCard";
import styles from "./index.module.scss";

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <h1 className={styles.heading}>
                Get yourself funded with Crypto <em>(Eth)</em>, <br /> Start a
                project now!!
            </h1>
            <CardComponent
                statistics={[
                    { heading: "455", subheading: "total projects created" },
                    { heading: "1555 Eth", subheading: "total crypto asked" },
                ]}
            />
            <div>
                <CampaignCard />
            </div>
        </div>
    );
};

export default HomePage;
