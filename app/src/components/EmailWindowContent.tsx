import React, { useState } from "react";

interface EmailWindowContentProps {
    onSend?: (to: string, subject: string, body: string) => void;
}

const EmailWindowContent: React.FC<EmailWindowContentProps> = ({ onSend }) => {
    const [from, setFrom] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    const handleSend = () => {
        if (!from || !subject || !body) {
            setStatus("Please fill in all fields.");
            return;
        }

        if (onSend) {
            onSend(from, subject, body);
        }

        setStatus("Email sent successfully!");
        setFrom("");
        setSubject("");
        setBody("");
    };

    const labelDivStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.5em",
    };

    return (
        <div style={{ padding: "1em", display: "flex", flexDirection: "column", gap: "0.75em", height: "100%" }}>

            <div style={labelDivStyle}>
                <label>To:</label>
                <input
                    type="email"
                    value="parv.p90@gmail.com"
                    style={inputStyle}
                    disabled
                />
            </div>

            <div style={labelDivStyle}>
                <label>From:</label>
                <input
                    type="email"
                    value={from}
                    style={inputStyle}
                    placeholder="Your email address"
                    onChange={(e) => setFrom(e.target.value)}
                />
            </div>

            <div style={labelDivStyle}>
                <label>Subject:</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={inputStyle}
                    placeholder="Email subject"
                />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <label>Body:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ ...inputStyle, flex: 1, resize: "none" }}
                    placeholder="Write your message..."
                />
            </div>

            {status && <div style={{ color: "green" }}>{status}</div>}

            <button onClick={handleSend} style={buttonStyle}>
                Send
            </button>
        </div>
    );
};

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.5em",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    marginTop: "0.25em",
};

const buttonStyle: React.CSSProperties = {
    padding: "0.5em 1em",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#178485",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    alignSelf: "flex-start",
};

export default EmailWindowContent;
