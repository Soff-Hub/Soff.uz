import { useState } from "react";

function TextSlicer({ bio, len = 80, title }) {
    const [expanded, setExpanded] = useState(false);

    if (!bio) return null;

    const shortText = bio.length > len ? bio.slice(0, len) + "..." : bio;

    return (
        <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: 0 }}>
            {title || ""}{" "}
            <span className="fw-normal">
                {expanded ? bio : shortText}
            </span>
            {bio.length > len && (
                <span
                    onClick={() => setExpanded(!expanded)}
                    style={{ color: "#00a44f" , cursor: "pointer", marginLeft: "8px", fontSize: "13px", fontWeight: 500, textDecoration: "underline" }}
                >
                    {expanded ? "kamroq" : "batafsil"}
                </span>
            )}
        </p>
    );
}


export default TextSlicer