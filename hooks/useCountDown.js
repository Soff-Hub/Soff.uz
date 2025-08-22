import { useEffect, useState } from "react";

export function useCountdown(secondsStart = 120) {
  const [left, setLeft] = useState(secondsStart);
  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [left]);
  const reset = () => setLeft(secondsStart);
  const fmt = (s) => {
    const m = Math.floor(s / 60), ss = String(s % 60).padStart(2, "0");
    return `${String(m).padStart(2, "0")}:${ss}`;
  };
  return { left, display: fmt(left), reset };
}