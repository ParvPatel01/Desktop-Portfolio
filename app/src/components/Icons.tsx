import type { FunctionComponent } from "react";
import React, { useState, useRef } from "react";
import PdfIcon from "./PdfIcon";
import MaterialIcon from "./MaterialIcon";
import TerminalIcon from "./TerminalIcon";
import EmailIcon from "./EmailIcon";

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
        const NAVBAR_HEIGHT = 40;

        let newX = e.clientX - offset.current.x;
        let newY = e.clientY - offset.current.y;

        newX = Math.max(0, Math.min(screenWidth - ICON_WIDTH, newX));
        newY = Math.max(NAVBAR_HEIGHT, Math.min(screenHeight - ICON_HEIGHT, newY));

        setPosition({ x: newX, y: newY });
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const renderCustomIcon = () => {
        if (label === "About Me") return <PdfIcon />;
        if (label === "Projects") return <TerminalIcon />;
        if (label === "Email") return <EmailIcon />;
        return <MaterialIcon icon={icon} size={size} />;
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
                    width: '3em',
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.2em",
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
                {renderCustomIcon()}
            </div>

            {/* Label */}
            {label && (
                <p style={{ fontSize: "1em", margin: 0, color: "#333", textAlign: "center" }}>
                    {label}
                </p>
            )}
        </div>
    );
};

export default Icons;
