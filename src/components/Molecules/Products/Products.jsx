import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { Navigate, useSearchParams } from "react-router-dom"
import classnames from "classnames"

import Styles from "./Products.module.scss"

import ProductCard from "../../Atoms/ProductCard/ProductCard"
import ErrorMessage from "../../Atoms/ErrorMessage/ErrorMessage"
import SkeletonLoader from "../../Atoms/Skillets/SkeletonLoader/SkeletonLoader"

import { fetchData } from "../../../axios/functions"
import LS_manage from "../../../utils/localStorage/LS_manage"

const Products = ({ className }) => {
    const { t, i18n } = useTranslation()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [itemsPerPage, setItemsPerPage] = useState(20)
    const [pagesCount, setPagesCount] = useState()

    console.log(data)
    const [searchParams, setSearchParams] = useSearchParams()
    const products = i18n.store.data[i18n.resolvedLanguage].translation.products

    const page = ~~+searchParams.get("page") || 1
    const startIndex = (page - 1) * itemsPerPage || 0

    const dataReqPage = Math.ceil(page / (100 / itemsPerPage)) || 1

    const menageDataState = (data) => {
        LS_manage.setItem("products", data)
        !pagesCount && setPagesCount(Math.ceil(data.total / itemsPerPage))
        setData(data)
    }

    const fetchDataAsync = async (p) => {
        try {
            setLoading(true)
            const data = {
                products: [],
                total: 0,
            }

            const responses = await Promise.all(
                Array.from({ length: p }).map((_, pi) => fetchData(pi + 1))
            )
            console.log(responses)
            responses.forEach((res) => {
                data.products.push(...res.data.products)
            })
            data.total = responses[0].data.total
            menageDataState(data)
        } catch (error) {
            console.error("Error fetching data:", error)
            setData(error)
        } finally {
            setLoading(false)
        }
    }

    const updateQuery = (page, id) => {
        if (id) {
            setSearchParams({ page: page, id: id }, { replace: true })
        } else {
            setSearchParams({ page: page }, { replace: true })
        }
    }

    useEffect(() => {
        const actualData = LS_manage.getData_Local("products")

        if (actualData && actualData.products.length >= dataReqPage * 100) {
            setData(actualData)
            !pagesCount &&
                setPagesCount(Math.ceil(actualData.total / itemsPerPage))

            setLoading(false)
        } else {
            fetchDataAsync(dataReqPage)
        }
        updateQuery(page)
    }, [page])

    const draw_ProductCards = (data) => {
        return data.slice(startIndex, startIndex + itemsPerPage).map((da) => {
            return (
                <ProductCard
                    id={da.id}
                    key={da.id}
                    page={page}
                    state={true}
                    name={da.name}
                    path={da.link}
                    media={da.media}
                    products={products}
                    updateQuery={updateQuery}
                />
            )
        })
    }

    return (
        <main>
            <div
                className={classnames({
                    [Styles["productsSection"]]: !className,
                })}
            >
                {loading ? (
                    <SkeletonLoader />
                ) : data.products ? (
                    <>{draw_ProductCards(data.products)}</>
                ) : (
                    <ErrorMessage message={data.message} />
                )}
            </div>

            {/* Pagination Controls */}
            {pagesCount > 1 && (
                <div className={Styles["pagination-controls"]}>
                    <button onClick={() => updateQuery(+page - 1)}>Prev</button>
                    <span
                        key={1}
                        onClick={() => updateQuery(1)}
                        className={classnames({
                            [Styles["active"]]: page == 1,
                        })}
                    >
                        {1}
                    </span>

                    <>
                        {Array.from({ length: pagesCount - 2 }, (_, i) =>
                            i < page + 1 && i > page - 5 ? (
                                <span
                                    key={i + 2}
                                    onClick={() => updateQuery(i + 2)}
                                    className={classnames({
                                        [Styles["active"]]: page == i + 2,
                                    })}
                                >
                                    {i + 2}
                                </span>
                            ) : null
                        )}
                    </>
                    <span
                        key={pagesCount}
                        onClick={() => updateQuery(pagesCount)}
                        className={classnames({
                            [Styles["active"]]: page == pagesCount,
                        })}
                    >
                        {pagesCount}
                    </span>
                    <button onClick={() => updateQuery(+page + 1)}>Next</button>
                </div>
            )}
        </main>
    )
}

export default Products
