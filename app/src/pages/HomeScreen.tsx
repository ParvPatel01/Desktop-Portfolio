import React, { useState, useCallback } from "react";
import NavBar from "../components/NavBar";
import Icons from "../components/Icons";
import Window from "../components/Window";
import ResumeWindowContent from "../components/ResumeWindowContent";
import EmailWindowContent from "../components/EmailWindowContent";
import ProjectsTerminal from "../components/ProjectsTerminal";

type IconKey = "resume" | "email" | "projects";

type IconItem = {
    icon: string;
    label: string;
    x: number;
    y: number;
    key: IconKey;
};

const iconItems: IconItem[] = [
    { icon: "code", label: "Resume.pdf", x: 10, y: 80, key: "resume" },
    { icon: "mail", label: "Contact.app", x: 10, y: 180, key: "email" },
    { icon: "folder", label: "Projects.md", x: 10, y: 280, key: "projects" },
];

const rootStyle: React.CSSProperties = {
    height: "100vh",
    width: "100vw",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#00878c",
    backgroundImage: "url('https://www.transparenttextures.com/patterns/cartographer.png')",
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
};

function HomeScreen() {
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [activeWindow, setActiveWindow] = useState<string | null>(null);

    const openWindow = useCallback((key?: string) => {
        if (!key) return;
        setOpenWindows((prev) => (prev.includes(key) ? prev : [...prev, key]));
        setActiveWindow(key);
    }, []);

    const focusWindow = useCallback((key: string) => setActiveWindow(key), []);

    const closeWindow = useCallback((key: string) => {
        setOpenWindows((prev) => prev.filter((k) => k !== key));
        setActiveWindow((prev) => (prev === key ? null : prev));
    }, []);

    const handleMenuClick = useCallback((_menu: string) => {
        // handle menu actions for the currently active window
    }, []);

    return (
        <div style={rootStyle}>
            <NavBar activeWindowKey={activeWindow} onMenuClick={handleMenuClick} />

            {iconItems.map((item) => (
                <Icons
                    key={item.key}
                    icon={item.icon}
                    label={item.label}
                    startX={item.x}
                    startY={item.y}
                    onClick={() => openWindow(item.key)}
                />
            ))}

            {openWindows.includes("resume") && (
                <Window
                    title="Resume.pdf"
                    onClose={() => closeWindow("resume")}
                    navbarHeight={40}
                    width={800}
                    height={750}
                    onFocus={() => focusWindow("resume")}
                >
                    <ResumeWindowContent file="/resume.pdf" />
                </Window>
            )}

            {openWindows.includes("email") && (
                <Window
                    title="Contact"
                    onClose={() => closeWindow("email")}
                    navbarHeight={35}
                    width={700}
                    height={600}
                    onFocus={() => focusWindow("email")}
                >
                    <EmailWindowContent onSend={() => {}} />
                </Window>
            )}

            {openWindows.includes("projects") && (
                <Window
                    title="Projects"
                    onClose={() => closeWindow("projects")}
                    navbarHeight={35}
                    width={800}
                    height={500}
                    onFocus={() => focusWindow("projects")}
                >
                    <ProjectsTerminal />
                </Window>
            )}
        </div>
    );
}

export default HomeScreen;
