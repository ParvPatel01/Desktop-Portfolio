import React, { useState, useRef, useEffect } from "react";
import projectData from "../../public/projects.json";

interface CommandEntry {
  command: string;
  output: React.ReactNode;
}

const PROJECTS = projectData.projects;

// Styles
const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    color: "#e5e5e5",
    height: "100%",
    width: "100%",
    padding: "10px",
    overflowY: "auto",
    fontSize: "18px",
  } as React.CSSProperties,

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "6px",
    fontSize: "18px",
  } as React.CSSProperties,

  tableHeader: {
    borderBottom: "1px solid #555",
  },

  tableRow: {
    borderBottom: "1px solid #333",
    cursor: "pointer",
  },

  btn: {
    padding: "4px 10px",
    background: "#3c3c3c",
    border: "1px solid #555",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

// Project Table Renderer
const ProjectTable = ({
  onOpen,
  projects = PROJECTS,
}: {
  onOpen: (name: string) => void;
  projects?: typeof PROJECTS;
}) => (
  <table style={styles.table}>
    <thead>
      <tr style={styles.tableHeader}>
        <th style={{ textAlign: "left", padding: "4px 8px" }}>Project</th>
        <th style={{ textAlign: "left", padding: "4px 8px" }}>Description</th>
        <th style={{ padding: "4px 8px" }}>Action</th>
      </tr>
    </thead>
    <tbody>
      {projects.map((p) => (
        <tr
          key={p.name}
          style={styles.tableRow}
          onClick={() => onOpen(p.name)}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2a2a2a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <td style={{ padding: "6px 8px", color: "#4ec9b0" }}>{p.name}</td>
          <td style={{ padding: "6px 8px", color: "#d4d4d4" }}>{p.description}</td>
          <td style={{ padding: "6px 8px" }}>
            <button
              style={styles.btn}
              onClick={(e) => {
                e.stopPropagation();
                onOpen(p.name);
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

// Terminal Component
export default function ProjectsTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandEntry[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // On mount: show startup banner
  useEffect(() => {
    setHistory([{ command: "", output: <StartupBanner /> }]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Banner
  const StartupBanner = () => (
    <>
      <div>Copyright (C) Terminal 8.0.2</div>
      <pre style={{ color: "#4ec9b0" }}>
{String.raw`
 ________  ________  ________  ___      ___ 
|\   __  \|\   __  \|\   __  \|\  \    /  /|
\ \  \|\  \ \  \|\  \ \  \|\  \ \  \  /  / /
 \ \   ____\ \   __  \ \   _  _\ \  \/  / / 
  \ \  \___|\ \  \ \  \ \  \\  \\ \    / /  
   \ \__\    \ \__\ \__\ \__\\ _\\ \__/ /   
    \|__|     \|__|\|__|\|__|\|__|\|__|/    
                                            
Portfolio Terminal v1.0
`}
      </pre>
      <div>~ Type 'help' for available commands</div>
      <br />
    </>
  );

  // Command Implementations
  const handleOpen = (name: string) => {
    const project = PROJECTS.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (!project) return <div>Project not found: {name}</div>;

    window.open(project.link, "_blank", "noopener,noreferrer");

    return (
      <>
        <div>Opening {project.name}...</div>
        <br />
        <div>{project.description}</div>
        <br />
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          {project.link}
        </a>
      </>
    );
  };

  const COMMANDS: Record<string, (...args: string[]) => React.ReactNode> = {
    help: () => (
      <>
        <div>Available commands:</div>
        <div>  help — Show command list</div>
        <div>  clear — Clear terminal</div>
        <div>  banner — Show ASCII art banner</div>
        <div>  projects &lt;keyword&gt; — Search projects</div>
        <div>  open &lt;project&gt; — Open a project</div>
        <div>  time — Show current time</div>
        <div>  about — Quick intro</div>
        <div>  whoami — Who is Parv?</div>
      </>
    ),

    banner: () => StartupBanner(),

    time: () => <div>{new Date().toLocaleString()}</div>,

    about: () => (
      <>
        <div>Hey, I'm Parv 👋</div>
        <div>Full-stack & systems-focused developer.</div>
      </>
    ),

    whoami: () => (
      <div>
        Parv Patel — Full-stack developer (Scala, TypeScript, React, distributed
        systems, game dev)
      </div>
    ),

    // Projects search command
    projects: (keyword = "") => {
      const search = keyword.toLowerCase();
      const results = PROJECTS.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.tech.toLowerCase().includes(search)
      );

      if (!results.length) return <div>No projects found for "{keyword}"</div>;
      return <ProjectTable onOpen={(name) => runCommand(`open ${name}`)} projects={results} />;
    },
  };

  // Command Runner
  const runCommand = (raw: string) => {
    const cmdLine = raw.trim();
    if (!cmdLine) return;

    // Clear terminal
    if (cmdLine === "clear") {
      setHistory([{ command: "", output: StartupBanner() }]);
      return;
    }

    const [cmd, ...args] = cmdLine.split(" ");
    let output: React.ReactNode;

    if (cmd === "open") {
      const name = args.join(" ");
      output = handleOpen(name);
    } else if (COMMANDS[cmd]) {
      output = COMMANDS[cmd](...args);
    } else {
      output = <div>Unknown command: {cmdLine} (type "help")</div>;
    }

    setHistory((prev) => [...prev, { command: cmdLine, output }]);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  // Render
  return (
    <div style={styles.container}>
      {history.map((entry, i) => (
        <div key={i}>
          {entry.command && (
            <div>
              <span style={{ color: "#4ec9b0" }}>visitor@parv-portfolio</span>
              <span style={{ color: "#9cdcfe" }}> $ </span>
              {entry.command}
            </div>
          )}
          <div>{entry.output}</div>
        </div>
      ))}

      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        <span style={{ color: "#4ec9b0", marginRight: 6 }}>
          visitor@parv-portfolio $
        </span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "18px",
          }}
        />
      </form>

      <div ref={terminalEndRef} />
    </div>
  );
}
