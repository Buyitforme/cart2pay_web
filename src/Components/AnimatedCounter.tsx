import React, { useEffect, useState } from "react";
import { Heading, Text } from "../Components/Typography";

interface AnimatedCounterProps {
  end: number;
  label: string;
  duration?: number; // in ms
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  label,
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const animate = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
        setPercentage(100);
        return;
      } else {
        setCount(Math.floor(start));
        setPercentage((start / end) * 100);
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  const radius = 50;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-32 h-32">
      {/* SVG Circle with fill */}
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="rotate-[-90deg]"
      >
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#10b981"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center rounded-full shadow-lg bg-gradient-to-br from-white via-white/80 to-primary backdrop-blur-md ">
        <Text
          size="xl"
          weight="bold"
          color="default"
          className="text-primary drop-shadow-md"
        >
          {count}+
        </Text>
        <Text
          size="sm"
          weight="medium"
          color="muted"
          className="uppercase tracking-wider"
        >
          {label}
        </Text>
      </div>
    </div>
  );
};

export default AnimatedCounter;
