import { useState, useRef } from "react";

interface WindowProps {
  title: string;
  width?: number;
  height?: number;
  navbarHeight?: number; // height of your top navbar
  onClose?: () => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  title,
  width = 400,
  height = 300,
  navbarHeight = 40,
  onClose,
  children,
}) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zIndex, setZIndex] = useState(1000);

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  // Bring window to front
  const bringToFront = () => setZIndex((prev) => prev + 1);

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    offset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || isFullscreen) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let newX = e.clientX - offset.current.x;
    let newY = e.clientY - offset.current.y;

    // constrain inside viewport
    newX = Math.max(0, Math.min(screenWidth - width, newX));
    newY = Math.max(navbarHeight, Math.min(screenHeight - height, newY));

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  const windowStyle: React.CSSProperties = {
    position: "absolute",
    left: isFullscreen ? 0 : position.x,
    top: isFullscreen ? navbarHeight : position.y,
    width: isFullscreen ? "100vw" : width,
    height: isFullscreen ? `calc(100vh - ${navbarHeight}px)` : height,
    backgroundColor: "#9b9b9bff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    borderRadius: "6px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    zIndex,
    userSelect: "none",
    transition: "all 0.1s ease",
  };

  const windowHeaderStyle: React.CSSProperties = {
    height: "2em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "10px",
    paddingRight: "5px",
    cursor: "grab",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    background: "rgba(255,255,255,0.35)",
    borderBottom: "1px solid rgba(255,255,255,0.25)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    color: "#1b1b1b",
    fontWeight: 600,
    fontSize: "14px",
    userSelect: "none",
  };

  const windowButtonStyle: React.CSSProperties = {
    width: "1.5em",
    height: "1.5em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "none",
    color: "#1b1b1b",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    userSelect: "none",
    borderRadius: "50%",
  };

  return (
    <div
      onMouseDown={bringToFront}
      style={windowStyle}
    >
      {/* Window Header */}
      <div
        style={windowHeaderStyle}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest(".material-symbols-outlined")) return;
          handlePointerDown(e);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <span>{title}</span>
        <div style={{ display: "flex", gap: "0.2em" }}>
          <span
            className="material-symbols-outlined"
            style={{ ...windowButtonStyle, backgroundColor: "rgba(0,200,65,0.7)" }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
          >
            fullscreen
          </span>
          <span
            className="material-symbols-outlined"
            style={{ ...windowButtonStyle, backgroundColor: "rgba(244,69,60,0.7)" }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose && onClose();
            }}
          >
            close
          </span>
        </div>
      </div>

      {/* Window Content */}
      <div style={{ flex: 1, padding: "1em", overflow: "auto" }}>{children}</div>
    </div>
  );
};

export default Window;
