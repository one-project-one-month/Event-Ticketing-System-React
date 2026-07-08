import React from "react";

interface LoadingStepProps {
  progress: number;
  onCancel: () => void;
}

export const LoadingStep: React.FC<LoadingStepProps> = ({
  progress,
  onCancel,
}) => {
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="my-16 flex h-[360px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-black bg-[#e6e6e6]">
      <svg width={size} height={size} className="mb-4">
        <circle
          className="text-gray-300"
          stroke="#d9d9d9"
          strokeWidth={strokeWidth}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className="text-[#233b75ff]"
          stroke="#233b75ff"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="-0.2em"
          className="text-xl font-bold text-[#233b75ff]"
        >
          {progress}%
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="1.5em"
          className="text-sm text-[#233b75ff]"
        >
          Complete
        </text>
      </svg>

      <div className="mb-3 text-sm font-medium text-[#233b75ff]">
        Uploading...
      </div>

      <button
        onClick={onCancel}
        className="hover:bg-muted rounded-[4px] border border-black px-6 py-2 text-black transition"
      >
        Cancel
      </button>
    </div>
  );
};
