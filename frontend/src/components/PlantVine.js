// Decorative line art follows the outer edges of the editorial sections.
export function PlantVine({ className = "" }) {
  return (
    <svg
      className={`plant-vine ${className}`}
      viewBox="0 0 240 680"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M147 678C93 584 196 530 147 437S54 309 105 222 157 85 121 2" />
        <path d="M144 607C85 597 46 549 51 509c49 6 82 41 93 98Z" />
        <path d="M147 546c59-14 86-56 76-91-46 12-70 43-76 91Z" />
        <path d="M151 449c-57-5-93-39-97-78 47-1 82 26 97 78Z" />
        <path d="M116 370c53-16 76-56 65-94-44 13-66 49-65 94Z" />
        <path d="M91 286c-52-10-79-47-76-85 44 7 69 40 76 85Z" />
        <path d="M114 205c58-12 87-46 84-80-45 6-72 32-84 80Z" />
        <path d="M135 130c-48-9-71-43-67-77 39 5 61 33 67 77Z" />
        <path d="M136 70c38-15 56-42 48-67-33 13-47 35-48 67Z" />
        <path d="m144 607-61-66m64 5 51-62m-47-35-49-50m14-29 44-66m-69-18-49-55m72-26 58-55m-37-20-44-51" />
      </g>
    </svg>
  );
}
