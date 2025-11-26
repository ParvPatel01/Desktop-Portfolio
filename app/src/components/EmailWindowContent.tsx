import React, { useState } from "react";
import emailjs from "@emailjs/browser";

interface EmailWindowContentProps {
    onSend?: (to: string, subject: string, body: string) => void | Promise<void>;
}

const EmailWindowContent: React.FC<EmailWindowContentProps> = ({ onSend }) => {
    const [from, setFrom] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [status, setStatus] = useState<string | null>(null);
    const [isSending, setIsSending] = useState(false);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const handleSend = async () => {
        setIsSending(true);
        setStatus(null);
        setErrorDetails(null);

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
            
            const templateParams = {
                to_email: "parv.p90@gmail.com",
                from_email: from,
                subject: subject,
                message: body,
            };
            
            await emailjs.send(serviceId, templateId, templateParams, publicKey);
            setStatus("Email sent successfully!");
            if (onSend) {
                await onSend(from, subject, body);
            }
        } catch (error) {
            setStatus("Failed to send email.");
            setErrorDetails(error instanceof Error ? error.message : String(error));
        } finally {
            setIsSending(false);
        }
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

            {status && (
                <div style={{ color: status.toLowerCase().includes("failed") ? "crimson" : "green" }}>{status}</div>
            )}

            {errorDetails && (
                <div style={{ marginTop: "0.25em" }}>
                    <button
                        onClick={() => setShowDetails((s) => !s)}
                        style={{
                            padding: "0.25em 0.5em",
                            marginBottom: "0.25em",
                            borderRadius: 4,
                            border: "1px solid #ccc",
                            background: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        {showDetails ? "Hide details" : "Show error details"}
                    </button>
                    {showDetails && (
                        <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: "0.5em", borderRadius: 4 }}>{errorDetails}</pre>
                    )}
                </div>
            )}

            <button onClick={handleSend} style={{ ...buttonStyle, opacity: isSending ? 0.6 : 1 }} disabled={isSending}>
                {isSending ? "Sending..." : "Send"}
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
