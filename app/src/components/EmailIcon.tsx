const EmailIcon = () => (
    <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        role="img"
        aria-label="Mail app icon"
    >
        {/* Background gradient */}
        <defs>
            <linearGradient id="mailGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a90e2" />
                <stop offset="100%" stopColor="#3570d6" />
            </linearGradient>
        </defs>

        {/* Rounded background */}
        <rect width="48" height="48" rx="12" fill="url(#mailGradient)" />

        {/* Envelope body */}
        <path
            d="M8 16h32v16H8z"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="1"
            rx="2"
        />

        {/* Envelope flap */}
        <path
            d="M8 16l16 12 16-12"
            fill="#5d5d5dff"
            opacity="0.9"
        />
    </svg>
);

export default EmailIcon;
