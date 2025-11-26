import React, { useState, useEffect, useRef } from "react";

interface NavBarProps {
    activeWindowKey: string | null;
    onMenuClick: (menu: string) => void;
}

const APP_MENUS: Record<string, { title: string; menus: string[] }> = {
    resume: { title: "Resume.pdf", menus: ["File", "Edit", "View"] },
    email: { title: "Contact", menus: ["File", "Edit", "Window"] },
    projects: { title: "Projects", menus: ["File", "View", "Help"] },
};


function NavBar({ activeWindowKey, onMenuClick }: NavBarProps) {
    const [time, setTime] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showClock, setShowClock] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const clockRef = useRef<HTMLDivElement>(null);
    const activeApp = activeWindowKey ? APP_MENUS[activeWindowKey] : null;
    const title = activeApp?.title || "";
    const menus = activeApp?.menus || [];

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
        setShowClock(false);
    };

    const toggleClock = () => {
        setShowClock(!showClock);
        setShowCalendar(false);
    }

    const renderCalendarDays = () => {
        const startDay = new Date(time.getFullYear(), time.getMonth(), 1).getDay();
        const daysInMonth = new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate();
        const weeks: React.ReactElement[] = [];
        let dayCounter = 1;

        for (let w = 0; w < 6; w++) {
            const weekDays = [];
            for (let d = 0; d < 7; d++) {
                if ((w === 0 && d < startDay) || dayCounter > daysInMonth) {
                    weekDays.push(<td key={d}></td>);
                } else {
                    const isToday =
                        dayCounter === time.getDate() &&
                        time.getMonth() === new Date().getMonth() &&
                        time.getFullYear() === new Date().getFullYear();
                    weekDays.push(
                        <td
                            key={d}
                            style={{
                                padding: "6px",
                                fontWeight: isToday ? 800 : 400,
                                backgroundColor: isToday ? "rgba(4, 188, 194, 1)" : "transparent",
                                borderRadius: isToday ? "50%" : "none",
                            }}
                        >
                            {dayCounter}
                        </td>
                    );
                    dayCounter++;
                }
            }
            weeks.push(<tr key={w}>{weekDays}</tr>);
        }

        return weeks;
    };


    const popupStyle: React.CSSProperties = {
        position: "absolute",
        top: "2.3em",
        right: "20px",
        width: "220px",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        background: "rgba(255, 255, 255, 0.35)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        borderRadius: "10px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        padding: "15px",
        fontSize: "16px",
        color: "#1b1b1b",
        fontFamily: "SF Pro Text, sans-serif",
        zIndex: 3000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5px",
    };
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "2.3em",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                background: "rgba(255,255,255,0.35)",
                borderBottom: "1px solid rgba(255,255,255,0.25)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                zIndex: 2000,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
                color: "#1b1b1b",
                fontSize: "16px",
                userSelect: "none",
            }}
        >
            {/* Left Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <span
                    style={{
                        fontSize: "1.1em",
                        fontWeight: 600,
                        letterSpacing: "-0.5px",
                    }}
                >
                    Parv Patel
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                    <span style={{ fontWeight: 600 }}>{title}</span>
                    <div style={{ display: "flex", gap: "1em" }}>
                        {menus.map((menu) => (
                            <span
                                key={menu}
                                onClick={() => onMenuClick(menu)}
                                style={{ cursor: "pointer", opacity: 0.7 }}
                            >
                                {menu}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    wifi
                </span>

                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    battery_android_5
                </span>

                <span onClick={toggleCalendar} style={{ cursor: "pointer" }}>
                    {time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </span>

                <span onClick={toggleClock} style={{ cursor: "pointer" }}>
                    {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </span>

                {showCalendar && (
                    <div style={popupStyle} ref={calendarRef}>
                        <div style={{ fontWeight: 600, marginBottom: "10px" }}>
                            {time.toLocaleString("default", { month: "long", year: "numeric" })}
                        </div>
                        <table style={{ width: "100%", textAlign: "center", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => <th key={d} style={{ padding: "4px", fontWeight: 500 }}>{d}</th>)}</tr>
                            </thead>
                            <tbody>{renderCalendarDays()}</tbody>
                        </table>
                    </div>
                )}


                {showClock && (
                    <div style={popupStyle} ref={clockRef}>
                        <div style={{ fontSize: "28px", fontWeight: 600 }}>{time.toLocaleTimeString()}</div>
                        <div style={{ marginTop: "5px", fontSize: "16px", opacity: 0.7 }}>{time.toLocaleDateString()}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavBar;
