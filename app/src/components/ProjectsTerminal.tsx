import React, { useState, useRef, useEffect } from "react";

interface Command {
  command: string;
  output: React.ReactNode;
}

const PROJECTS = [
  {
    name: "ChainStorm",
    description: "Blockchain prototype using Scala & Akka Actors with PoW mining, decentralized nodes, REST API & async messaging.",
    tech: "Scala, Akka, Akka HTTP, Blockchain",
    link: "https://github.com/ParvPatel01/ChainStorm"
  },
  {
    name: "3D-Bin-Packing",
    description: "3D bin packing algorithm with TypeScript + React visualizer using Three.js and skyline-based placement.",
    tech: "TypeScript, React, Three.js, Algorithms",
    link: "https://github.com/ParvPatel01/3D-Bin-Packing"
  },
  {
    name: "Spotlight 2",
    description: "Human rights violation reporting platform with profiles, issue reporting, categorization, and community engagement.",
    tech: "TypeScript, React, Node.js, Express, Redux",
    link: "https://github.com/ParvPatel01/Spotlight2"
  },
  {
    name: "Dante’s Inferno",
    description: "2D platformer adventure inspired by Dante Alighieri’s poem, featuring dark hell-themed environments, puzzles, and boss progression.",
    tech: "Unity, C#, 2D Game Design",
    link: "https://github.com/ParvPatel01/Dantes-Inferno-Game"
  },
  {
    name: "Wholesale Management Systems DB",
    description: "A full-scale wholesale business database featuring ERDs, triggers, views, stored procedures, and PowerBI dashboards for inventory and transaction insights.",
    tech: "SQL Server, ERD, DBMS, Python, PowerBI",
    link: "https://github.com/ParvPatel01/DMDD_GRP_19_WholesaleManagementSystem"
  }
];

export default function ProjectsTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Initial startup banner
  useEffect(() => {
    setHistory([
      {
        command: "",
        output: (
          <>
            <div>Copyright (C) QTerminal 8.0.2</div>
            <div>~ Type 'help' for available commands</div>
            <br />
          </>
        ),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [history]);

  // Interactive project table
  const renderProjectTable = () => (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "6px",
        fontSize: "18px",
      }}
    >
      <thead>
        <tr style={{ borderBottom: "1px solid #555" }}>
          <th style={{ textAlign: "left", padding: "4px 8px" }}>Project</th>
          <th style={{ textAlign: "left", padding: "4px 8px" }}>Description</th>
          <th style={{ padding: "4px 8px" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {PROJECTS.map((p) => (
          <tr key={p.name} style={{ borderBottom: "1px solid #333" }}>
            <td style={{ padding: "6px 8px", color: "#4ec9b0" }}>{p.name}</td>
            <td style={{ padding: "6px 8px", color: "#d4d4d4" }}>{p.description}</td>
            <td style={{ padding: "6px 8px" }}>
              <button
                onClick={() => runCommand(`open ${p.name}`)}
                style={{
                  padding: "4px 10px",
                  background: "#3c3c3c",
                  border: "1px solid #555",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Open
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let output: React.ReactNode = "";

    switch (trimmed) {
      case "help":
        output = (
          <>
            <div>Available commands:</div>
            <div>  help --- Show command list</div>
            <div>  clear --- Clear terminal</div>
            <div>  ls --- List all projects</div>
            <div>  open &lt;project&gt; --- Open project details</div>
          </>
        );
        break;

      case "clear":
        setHistory([
          {
            command: "",
            output: (
              <>
                <div>Copyright (C) QTerminal 8.0.2</div>
                <div>~ Type 'help' for available commands</div>
                <br />
              </>
            ),
          },
        ]);
        return;

      case "ls":
        output = renderProjectTable();
        break;

      default:
        if (trimmed.startsWith("open ")) {
          const name = trimmed.replace("open ", "").trim();
          const project = PROJECTS.find((p) => p.name === name);
          project ? window.open(project.link, "_blank", "noopener,noreferrer") : null;
          output = project ? (
            <>
              <div>Opening {project.name}...</div>
              <br />
              <div>{project.description}</div>
              <br />
              <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a>
            </>
          ) : (
            <div>Project not found: {name}</div>
          );
        } else {
          output = <div>Unknown command: {trimmed} (type "help")</div>;
        }
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        color: "#e5e5e5",
        height: "100%",
        width: "100%",
        padding: "10px",
        overflowY: "auto",
        fontSize: "18px",
      }}
    >
      {history.map((item, i) => (
        <div key={i} >
          {/* Terminal prompt */}
          {item.command && (
            <div>
              <span style={{ color: "#4ec9b0" }}>visitor@parv-portfolio</span>
              <span style={{ color: "#9cdcfe" }}> $ </span>
              {item.command}
            </div>
          )}

          {/* Output */}
          <div>{item.output}</div>
        </div>
      ))}

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        <span style={{ color: "#4ec9b0", marginRight: 6 }}>
          visitor@parv-portfolio $
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontFamily: "inherit",
            fontSize: "18px",
          }}
          autoFocus
        />
      </form>

      <div ref={terminalEndRef} />
    </div>
  );
}
