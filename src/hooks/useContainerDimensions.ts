import { useRef, useState, useEffect } from "react";

export function useContainerDimensions<
  T extends HTMLElement = HTMLDivElement,
>() {
  const ref = useRef<T | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width: Math.floor(width), height: Math.floor(height) });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, dimensions } as const;
}

export default useContainerDimensions;
