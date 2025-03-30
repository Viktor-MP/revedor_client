import React, { useState } from "react";
import Classes from "./List.module.scss";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

const List = ({ lf, children, path, className }) => {
    const location = useLocation(); // Provides location information
    const [left, setLeft] = useState(lf);
    const [right, setRight] = useState(lf);

    const [top, setTop] = useState(lf);
    const [bottom, setBottom] = useState(lf);

    const checkCorners = ({ mouseX, mouseY, left, right }) => {
        if (mouseX < left.x) {
            setLeft(true);
            if (mouseY <= left.topY) setTop(true);
            if (mouseY >= left.bottomY) setBottom(true);
        } else if (mouseX > right.x) {
            setRight(true);
            if (mouseY <= right.topY) setTop(true);
            if (mouseY >= right.bottomY) setBottom(true);
        } else if (mouseX >= left.x && mouseX <= right.x) {
            if (mouseY < left.topY) setTop(true);
            else if (mouseY > left.bottomY) setBottom(true);
        }
    };

    const handleMouse = (event) => {
        setBottom(false);
        setLeft(false);
        setTop(false);
        setRight(false);
        if (path !== location.pathname) {
            const rect = event.currentTarget.getBoundingClientRect(); // Get button dimensions
            const width3 = rect.width / 3;
            const height3 = rect.height / 3;
            const mouseInfo = {
                mouseX: event.clientX, // Mouse X-coordinate
                mouseY: event.clientY, // Mouse Y-coordinate
                left: {
                    x: rect.left + width3,
                    topY: rect.top + height3,
                    bottomY: rect.bottom - height3,
                },
                right: {
                    x: rect.right - width3,
                    topY: rect.top + height3,
                    bottomY: rect.bottom - height3,
                },
            };
            checkCorners(mouseInfo);
        }
    };
    return (
        <li
            className={`${[Classes["list"]]} ${classNames({
                [Classes["left"]]: left,
                [Classes["right"]]: right,
                [Classes["top"]]: top,
                [Classes["bottom"]]: bottom,
                [Classes["samePath"]]: location.pathname.includes(path),
            })}`}
            onMouseEnter={handleMouse}
            onMouseOut={handleMouse}
        >
            {children}
        </li>
    );
};

export default List;
