import type { FunctionComponent } from "react";
import React, { useState, useRef, useEffect } from "react";

interface IconsProps {
    icon: string;
    label?: string;
    size?: number;
    onClick?: () => void;
    startX?: number;
    startY?: number;
}

const Icons: FunctionComponent<IconsProps> = ({
    icon,
    label,
    size = 24,
    onClick,
    startX = 100,
    startY = 100
}) => {

    const [position, setPosition] = useState({ x: startX, y: startY });
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const ICON_WIDTH = 60;
    const ICON_HEIGHT = 80;

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        dragging.current = true;

        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };

        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragging.current) return;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let newX = e.clientX - offset.current.x;
        let newY = e.clientY - offset.current.y;
        const NAVBAR_HEIGHT = 40; // px

        newX = Math.max(0, Math.min(screenWidth - ICON_WIDTH, newX));
        newY = Math.max(NAVBAR_HEIGHT, Math.min(screenHeight - ICON_HEIGHT, newY));
        setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    return (
        <div
            style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                userSelect: "none",
                touchAction: "none",
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            {/* Icon Tile */}
            <div
                style={{
                    height: "4em",
                    width: "3em",
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    border: "1px solid #dcdcdc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.3em",
                    boxShadow: "rgba(0,0,0,0.1) 0px 4px 4px",
                    cursor: dragging.current ? "grabbing" : "grab",
                    transition: dragging.current ? "none" : "transform 0.2s ease",
                    transformOrigin: "center bottom"
                }}
                onMouseEnter={(e) => {
                    if (!dragging.current) e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                    if (!dragging.current) e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={onClick}
            >
                <span className="material-symbols-outlined" style={{ fontSize: size }}>
                    {icon}
                </span>
            </div>

            {/* Optional Label */}
            {label && (
                <p style={{ fontSize: "1em", margin: 0, color: "#333" }}>
                    {label}
                </p>
            )}
        </div>
    );
};

export default Icons;
