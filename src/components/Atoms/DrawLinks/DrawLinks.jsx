import React from "react"
import { Link } from "react-router-dom"

const DrawLinks = ({ object, valueState, target="_blank" }) => {
    console.log(object)
    console.log(valueState)
    return (
        <ul>
            {Object.entries(object).map(([key, value], index) => (
                <li key={key}>
                    <Link to={value} target={target}>
                        {/* {key} {valueState && value} */}
                        {valueState ? key : value}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default DrawLinks
