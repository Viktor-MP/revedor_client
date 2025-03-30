import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { CopyToClipboard } from "react-copy-to-clipboard"
import classNames from "classnames"

import {
    FaArrowAltCircleLeft,
    FaShoppingBasket,
    FaRegCopy,
} from "react-icons/fa"

import Styles from "./ProductWindow.module.scss"
import { getCardInfo } from "../../../axios/functions"

const ProductWindow = ({ id, page, products }) => {
    console.log(id, page)
    const [itemData, setItemData] = useState({})

    const [copyStatus, setCopyStatus] = useState(false)
    const [itemWindow, setItemWindow] = useState(false)
    const [imageInd, setImageInd] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCardInfo = async () => {
            try {
                const data = await getCardInfo(id)
                console.log(data)
                setItemData(data)
            } catch (error) {
                console.error("Error fetching data:", error)
                setItemData(error)
            }
        }

        fetchCardInfo()
        setItemWindow(id ? true : false)
    }, [id])

    // console.log(products)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape" || event.key === "Backspace") {
                // window.history.back()
                navigate(`/products?page=${page}`)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const onCopyText = () => {
        setCopyStatus(true)
        setTimeout(() => setCopyStatus(false), 2000)
    }

    const draw_images = (item) => {
        console.log(item)
        return item.map((image, ind) => {
            return (
                <li
                    onMouseOver={() => {
                        setImageInd(ind)
                    }}
                    key={ind}
                >
                    <img src={image} alt={" image-" + ind} />
                </li>
            )
        })
    }

    const draw_info = (info) => {
        console.log(info)

        return info.map((inf, ind) => {
            return (
                <div key={ind}>
                    <h4>
                        <b>{inf.name}</b>
                    </h4>

                    <p>{inf.value}</p>
                </div>
            )
        })
    }
    console.log(products)

    return (
        <section
            className={classNames({
                [Styles["window"]]: true,
                [Styles["open"]]: itemWindow,
            })}
        >
            <div
                className={classNames({
                    [Styles["content"]]: true,
                })}
            >
                <div
                    className={classNames({
                        [Styles["window_head"]]: true,
                    })}
                >
                    <FaArrowAltCircleLeft
                        onClick={() => {
                            setItemWindow(false)
                            navigate(`/products?page=${page}`)
                        }}
                        title="Esc or Backspace to go back."
                    />
                    <h3 className=" sticky top-0 m-auto text-3xl ">
                        <b>{itemData.imt_name}</b>
                    </h3>
                </div>
                <div
                    className={classNames({
                        [Styles["mainInfo"]]: true,
                    })}
                >
                    <div
                        className={classNames({
                            [Styles["images"]]: true,
                        })}
                    >
                        <ul>
                            {itemData.media &&
                                draw_images(itemData.media.photos)}
                        </ul>
                        <div>
                            <img
                                width={"100%"}
                                src={itemData?.media?.photos[imageInd]}
                                alt={imageInd + "Big"}
                            />
                        </div>
                    </div>
                    <div
                        className={classNames({
                            [Styles["info"]]: true,
                        })}
                    >
                        <h3>
                            <b>
                                {itemData.grouped_options &&
                                    itemData.grouped_options[0].group_name}
                            </b>
                        </h3>
                        <div>
                            <div>
                                <h4>
                                    <b>{products.art}</b>
                                </h4>
                                <CopyToClipboard
                                    text={itemData.imt_id}
                                    onCopy={onCopyText}
                                >
                                    <span>
                                        {itemData.imt_id} <FaRegCopy />
                                        {copyStatus && (
                                            <span>{products.copied}</span>
                                        )}
                                    </span>
                                </CopyToClipboard>
                            </div>
                            {itemData.options && draw_info(itemData.options)}
                        </div>
                        <button className={Styles["buy"]}>
                            <a target="_blank" href={itemData.link}>
                                {products.see}
                                {" "}
                                {<FaShoppingBasket />}
                            </a>
                        </button>
                    </div>

                    <div
                        className={classNames({
                            [Styles["description"]]: true,
                        })}
                    >
                        <h3>
                            <b>
                                {itemData.grouped_options &&
                                    itemData.grouped_options[1].group_name}
                            </b>
                        </h3>
                        <p>{`${itemData.description}`}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductWindow
