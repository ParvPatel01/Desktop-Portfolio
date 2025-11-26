import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Icons from "../components/Icons";
import Window from "../components/Window";
import ResumeWindowContent from "../components/ResumeWindowContent";
import EmailWindowContent from "../components/EmailWindowContent";

const iconItems = [
    { icon: "code", label: "Resume.pdf", x: 10, y: 80, key: "resume" },
    { icon: "mail", label: "Email", x: 10, y: 180, key: "email" },
    { icon: "folder", label: "Projects.md", x: 10, y: 280, key: "projects" },
];

function HomeScreen() {
    const [openWindows, setOpenWindows] = useState<string[]>([]);

    const openWindow = (key?: string) => {
        if (!key) return;
        setOpenWindows((prev) => (prev.includes(key) ? prev : [...prev, key]));
    };

    const closeWindow = (key: string) => {
        setOpenWindows((prev) => prev.filter((k) => k !== key));
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "#178485",
                position: "relative",
            }}
        >
            <NavBar />

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
                <Window title="Resume.pdf" onClose={() => closeWindow("resume")} navbarHeight={40} width={800} height={750}>
                    <ResumeWindowContent file="../../public/resume.pdf" />
                </Window>
            )}

            {openWindows.includes("email") && (
                <Window title="Email" onClose={() => closeWindow("email")} navbarHeight={35} width={700} height={600}>
                    <EmailWindowContent onSend={() => {}} />
                </Window>
            )}

            {openWindows.includes("projects") && (
                <Window title="Projects" onClose={() => closeWindow("projects")} navbarHeight={35}>
                    <p>This is the projects content!</p>
                </Window>
            )}
        </div>
    );
}

export default HomeScreen;
