import "./App.scss"

import React, { Suspense, useEffect } from "react"

import { Footer, Header } from "./components/index"
import {
    Outlet,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom"

import ProductWindow from "./components/Atoms/ProductWindow/ProductWindow"
import Home from "./components/Molecules/Home/Home.jsx"
import { providerPath as path } from "./routing/routingPath.js"
import i18n from "./translation/i18n.js"

const App = () => {
    const API_URL = import.meta.env.VITE_API_URL

    console.log(API_URL)
    const location = useLocation() // Provides location information
    const [searchParams] = useSearchParams()
    
    const products = i18n.store.data[i18n.resolvedLanguage].translation.products
    const page = searchParams.get("page") || 1
    const id = searchParams.get("id")

    const navigate = useNavigate()
console.log(products)
    useEffect(() => {
        console.log("hello")
        location.pathname === path.base && navigate(path.products)
    }, [])
    console.log(i18n)
    return (
        <main className="App">
            <Header />
            {/* {product && <ProductWindow products={products} />} */}
            {id && <ProductWindow id={id} page={page} products={products}  />}

            {/* {location.pathname === path.base && <Home />} */}
            <Suspense fallback={<p>Loading...</p>}>
                <Outlet />
            </Suspense>
            <Footer />
        </main>
    )
}

export default App
