// Kindliche Wachsmalstift-Tulpen – absichtlich wackelig und unperfekt.
// Kein SVG-Filter (feTurbulence): spart GPU/CPU, besonders auf Mobilgeräten.
export function CrayonTulips({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 380 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* Stiele – leicht schief, doppelte Striche */}
        <path
          d="M52 168c4-22-6-48 2-86c3-14-1-28 3-42"
          stroke="#2f6b2c"
          strokeWidth="5.5"
        />
        <path
          d="M55 166c1-26-2-50 1-84c2-16 4-30 1-44"
          stroke="#6aa84f"
          strokeWidth="2.5"
          opacity="0.65"
        />

        <path
          d="M112 170c-5-30 8-55-2-98c-3-18 6-34 2-52"
          stroke="#2f6b2c"
          strokeWidth="6"
        />
        <path
          d="M116 168c-2-28 4-58 0-96c-1-20 3-36 0-50"
          stroke="#7cb85a"
          strokeWidth="2.8"
          opacity="0.55"
        />

        <path
          d="M178 166c6-24-4-46 3-72c4-16-2-30 2-46"
          stroke="#2f6b2c"
          strokeWidth="5"
        />
        <path
          d="M181 165c3-26 0-48 2-74c1-14 4-28 0-44"
          stroke="#5a9a40"
          strokeWidth="2.4"
          opacity="0.6"
        />

        <path
          d="M248 170c-7-28 5-52-3-90c-2-18 5-36 1-54"
          stroke="#2f6b2c"
          strokeWidth="6.2"
        />
        <path
          d="M252 168c-3-30 2-56-1-92c0-18 2-34-1-52"
          stroke="#6aa84f"
          strokeWidth="2.6"
          opacity="0.55"
        />

        <path
          d="M318 166c4-20-3-40 4-62c3-14-1-26 2-40"
          stroke="#2f6b2c"
          strokeWidth="5"
        />
        <path
          d="M321 164c1-22 2-42 3-64c2-12 0-24 1-38"
          stroke="#7cb85a"
          strokeWidth="2.3"
          opacity="0.55"
        />

        {/* Blätter – krumm */}
        <path
          d="M54 128c-18 2-28 16-30 28c14-6 24-10 32-18z"
          fill="#5a9a40"
          fillOpacity="0.45"
          stroke="#2f6b2c"
          strokeWidth="3"
        />
        <path
          d="M114 136c16-4 28 6 32 18c-12-2-22-4-34-10z"
          fill="#6aa84f"
          fillOpacity="0.4"
          stroke="#2f6b2c"
          strokeWidth="2.8"
        />
        <path
          d="M180 120c-16 8-22 22-20 32c12-8 18-14 24-24z"
          fill="#5a9a40"
          fillOpacity="0.42"
          stroke="#2f6b2c"
          strokeWidth="2.6"
        />
        <path
          d="M248 130c-20 6-30 20-28 34c16-10 24-16 32-26z"
          fill="#6aa84f"
          fillOpacity="0.4"
          stroke="#2f6b2c"
          strokeWidth="3"
        />
        <path
          d="M320 122c14-6 24 2 28 14c-10 0-18-2-28-8z"
          fill="#5a9a40"
          fillOpacity="0.38"
          stroke="#2f6b2c"
          strokeWidth="2.5"
        />

        {/* Tulpe 1 – Rot, plump */}
        <path
          d="M38 88c-6-22 4-42 20-48c2 16 8 18 14-2c14 8 22 28 14 48c-10 6-30 10-48 2z"
          fill="#e23d3d"
          fillOpacity="0.72"
          stroke="#a82222"
          strokeWidth="3.5"
        />
        <path
          d="M44 86c0-16 6-30 14-36"
          stroke="#ff7a6e"
          strokeWidth="2.4"
          opacity="0.8"
        />
        <path
          d="M60 52c4 12 8 24 8 36"
          stroke="#ff7a6e"
          strokeWidth="2.2"
          opacity="0.7"
        />

        {/* Tulpe 2 – Gelb, höher, schief */}
        <path
          d="M94 72c-8-26 2-48 22-56c4 18 10 20 16-4c16 10 24 32 16 56c-12 8-34 12-54 4z"
          fill="#f0c420"
          fillOpacity="0.78"
          stroke="#c49200"
          strokeWidth="3.8"
        />
        <path
          d="M102 70c2-18 8-34 16-42"
          stroke="#ffe566"
          strokeWidth="2.6"
          opacity="0.85"
        />
        <path
          d="M122 20c3 14 8 28 10 44"
          stroke="#ffe566"
          strokeWidth="2.3"
          opacity="0.75"
        />

        {/* Tulpe 3 – Lila */}
        <path
          d="M162 92c-5-18 3-36 18-42c3 12 7 14 12-2c12 6 18 24 12 42c-8 5-26 8-42 2z"
          fill="#8e5cc0"
          fillOpacity="0.7"
          stroke="#5e2f8a"
          strokeWidth="3.2"
        />
        <path
          d="M168 90c1-12 5-24 12-30"
          stroke="#c49ae8"
          strokeWidth="2"
          opacity="0.75"
        />
        <path
          d="M184 52c2 10 5 20 6 32"
          stroke="#c49ae8"
          strokeWidth="1.9"
          opacity="0.7"
        />

        {/* Tulpe 4 – Orange, groß */}
        <path
          d="M228 76c-10-24 0-46 20-54c5 16 11 18 17-2c15 8 24 30 16 54c-11 7-32 11-53 2z"
          fill="#ef7a1a"
          fillOpacity="0.75"
          stroke="#b84e00"
          strokeWidth="3.6"
        />
        <path
          d="M236 74c1-16 7-32 14-40"
          stroke="#ffb35a"
          strokeWidth="2.5"
          opacity="0.8"
        />
        <path
          d="M256 26c4 14 8 28 8 42"
          stroke="#ffb35a"
          strokeWidth="2.2"
          opacity="0.72"
        />

        {/* Tulpe 5 – Rosa, kleiner */}
        <path
          d="M302 96c-4-16 4-32 16-38c2 12 6 12 10 0c10 6 16 22 10 38c-8 4-24 6-36 0z"
          fill="#ef5f98"
          fillOpacity="0.72"
          stroke="#c2306a"
          strokeWidth="3"
        />
        <path
          d="M308 94c0-12 4-22 10-28"
          stroke="#ff9ec0"
          strokeWidth="2"
          opacity="0.8"
        />
        <path
          d="M320 60c2 10 4 18 4 28"
          stroke="#ff9ec0"
          strokeWidth="1.8"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}
