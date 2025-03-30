import App from "../App"
import { Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"

import { providerPath as path } from "./routingPath"

import {
    AboutUs,
    Products,
    Contacts,
    ErrorEl,
    Loading,
    PrivacyPolicy,
    TermsOfService,
} from "../components"

const withSuspense = (Component) => (
    <Suspense fallback={<Loading />}>
        <Component />
    </Suspense>
)
const routes = createBrowserRouter(
    [
        {
            path: path.base,
            element: withSuspense(App),
            errorElement: withSuspense(ErrorEl),

            children: [
                {
                    path: path.aboutUs,
                    element: withSuspense(AboutUs),
                },
                {
                    path: path.products,
                    element: withSuspense(Products),
                },
                {
                    path: path.contacts,
                    element: withSuspense(Contacts),
                },
                {
                    path: path.privacy,
                    element: withSuspense(PrivacyPolicy),
                },
                {
                    path: path.terms,
                    element: withSuspense(TermsOfService),
                },
            ],
        },
    ],
    {
        future: {
            v7_startTransition: true, // Opt-in for startTransition handling
            v7_relativeSplatPath: true, // Opt-in for updated relative splat resolution
        },
    }
)

export default routes
