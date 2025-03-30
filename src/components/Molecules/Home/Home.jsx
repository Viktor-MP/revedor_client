import React from "react";

import Styles from "./Home.module.scss";
import i18n from "../../../translation/i18n";
import ProductCard from "../../Atoms/ProductCard/ProductCard";
import classNames from "classnames";

import "../../global.scss";
// import { draw_ProductCards } from "../Products/Products";

const Home = ({ className }) => {
    const products =
        i18n.store.data[i18n.resolvedLanguage].translation.products;

    const draw_ProductCards = (keys, products, mediaLinks) => {
        console.log(products, mediaLinks);
        return keys.map((key) => {
            return (
                <ProductCard
                    path={key}
                    key={key}
                    value={products.perfume[key]}
                    media={mediaLinks[key]}
                    products={products}
                    className={"home_card"}
                />
            );
        });
    };

    const getRandomKeys = (media) => {
        const keyArray = [];
        const keys = Object.keys(media);
        console.log(keys.length);
        const keysPercent = (keys.length * 10) / 100;
        const getKey = (key) => {
            const randomIndex = Math.floor(Math.random() * key.length);

            if (keyArray.length <= keysPercent) {
                if (!keyArray.includes(key[randomIndex])) {
                    keyArray.push(key[randomIndex]);
                }
                getKey(key);
            }
            return keyArray;
        };
        return getKey(keys);
    };

    // console.log(getRandomKeys(mediaLinks));
    console.log("products", products);
    console.log("mediaLinks", mediaLinks);

    return (
        <section
            className={classNames({
                [Styles["homeSection"]]: !className,
            })}
        >
            <h3>{products.rec}</h3>{" "}
            <div
                className={classNames({
                    [Styles["products"]]: !className,
                })}
            >
                <div className={Styles["preview"]}>
                    {draw_ProductCards(
                        getRandomKeys(mediaLinks),
                        products,
                        mediaLinks
                    )}
                </div>
            </div>
        </section>
    );
};

export default Home;
