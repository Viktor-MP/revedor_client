import React, { useEffect, useState } from "react"

import Classes from "./ProductCard.module.scss"
import classNames from "classnames"


const ProductCard = ({
    id,
    path,
    name,
    page,
    media,
    state,
    products,
    className,
    updateQuery,
}) => {
    const length = media.length
    const [currentIndex, setCurrentIndex] = useState(0)

    const [hovered, setHovered] = useState(false)

    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)
    const getNextIndex = () => (currentIndex + 1) % length

    

    useEffect(() => {
        let timer
        if (hovered) {
            timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % length)
            }, 3000) // Transition every 2 seconds
        }
        return () => {
            clearInterval(timer)
            setCurrentIndex(0)
        }
    }, [hovered, length])

    return (
        <div
            className={classNames({
                [className]: className,
                [Classes["image-container"]]: !className,
            })}
            onClick={() => updateQuery(page, id)}
        >
            <div
                className={classNames({
                    [Classes["carousel-track"]]: true,
                    [Classes["hover"]]: hovered,
                })}
                onMouseOver={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onBlur={handleMouseLeave}
                key={currentIndex}
                tabIndex={0}
            >
                <img
                    className={classNames({
                        [Classes["current-image"]]: !className,
                    })}
                    src={media[currentIndex]}
                    height={300}
                    width={"100%"}
                    alt={`Slide ${currentIndex + 1}`}
                />

                <img
                    className={classNames({
                        [Classes["next-image"]]: !className,
                    })}
                    src={media[getNextIndex()]}
                    width={"100%"}
                    height={300}
                    alt={`Slide ${getNextIndex() + 1}`}
                />
            </div>

            {state && (
                <>
                    <div className={Classes["dotes"]}>
                        {media.map((el, ind) => {
                            return (
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentIndex(ind)
                                    }}
                                    key={ind}
                                    className={classNames({
                                        [Classes["circle"]]: !className,
                                        [Classes["dark"]]: currentIndex === ind,
                                    })}
                                ></span>
                            )
                        })}
                    </div>
                    <div className={Classes["card_info"]}>
                        <b>{name}</b>
                    </div>
                    <span>
                        <a
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            target="_blank"
                            href={path}
                        >
                            {products.see}
                        </a>
                    </span>
                </>
            )}
        </div>
    )
}

export default ProductCard
