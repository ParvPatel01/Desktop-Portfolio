import React, { useState, useEffect } from "react";

function NavBar() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
                fontFamily: "SF Pro Text, sans-serif",
                color: "#1b1b1b",
                fontSize: "14px",
                userSelect: "none",
            }}
        >
            {/* Left Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <span
                    style={{
                        fontSize: "1.1em",
                        fontWeight: 600,
                        fontFamily: "SF Pro Display, sans-serif",
                        letterSpacing: "-0.5px",
                    }}
                >
                    Parv Patel
                </span>



                <span style={{ fontWeight: 500 }}>Portfolio</span>

                <span style={{ opacity: 0.7 }}>File</span>
                <span style={{ opacity: 0.7 }}>Edit</span>
                <span style={{ opacity: 0.7 }}>View</span>
                <span style={{ opacity: 0.7 }}>Window</span>
            </div>

            {/* Right Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    wifi
                </span>

                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    battery_android_5
                </span>

                <span>
                    {time.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric"
                    })}{" "}
                    {time.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </span>
            </div>
        </div>
    );
}

export default NavBar;
