import React, { useState, useEffect } from 'react';

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
                height: "2em",
                width: "100%",
                backgroundColor: "rgb(228, 219, 238)",
                position: "relative",
                transition: "box - shadow 0.2s ease -in -out",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: "25px",
                paddingLeft: "25px",
                userSelect: "none",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 7px 0px 0px",
                fontSize: "25px",
                color: "#1D152B",
            }}>
            <div>
                <p style={{
                    fontSize: "1em",
                    fontWeight: "800"
                }}>Parv Patel</p>
            </div>
            <div style={{
                display: "flex",
            }}>
                <div className="fullscreen-btn" style={{ marginRight: '0.5em' }}>
                    <span className="material-symbols-outlined">
                        fullscreen
                    </span>
                </div>
                <div className="calender" style={{marginRight: '0.5em'}}>
                    <p className="date">{time.toLocaleDateString()}</p>
                </div>
                <div className="clock">
                    <p className="time">{time.toLocaleTimeString('en-US')}</p>
                </div>
            </div>
        </div >
    );
}

export default NavBar;