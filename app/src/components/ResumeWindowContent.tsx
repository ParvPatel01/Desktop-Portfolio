import React from "react";

interface ResumeWindowContentProps {
  file: string; // path to PDF file
}

const ResumeWindowContent: React.FC<ResumeWindowContentProps> = ({ file }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
      }}
    >
      <iframe
        src={file}
        style={{
          width: "98%",
          height: "100%",
          border: "1px solid #999",
          borderRadius: "4px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
        title="About Me PDF"
      />
    </div>
  );
};

export default ResumeWindowContent;