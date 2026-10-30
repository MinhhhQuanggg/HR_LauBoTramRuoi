interface CurvedWaveDividerProps {
  fillColor?: string;
  className?: string;
  flip?: boolean;
}

export default function CurvedWaveDivider({
  fillColor = "#F8F9FA",
  className = "",
  flip = false,
}: CurvedWaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className} ${
        flip ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 md:h-20 lg:h-24 block"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C320,100 680,120 1020,70 C1200,45 1340,15 1440,0 L1440,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
