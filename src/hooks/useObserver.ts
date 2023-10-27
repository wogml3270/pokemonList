import { useEffect, useState } from "react";

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  target: React.ReactHTML;
  onIntersect: IntersectionObserverCallback;
  enabled: boolean | undefined;
}

const useIntersectionObserver = ({
  root,
  onIntersect,
  threshold = 1.0,
  rootMargin = "0px",
  enabled = true,
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [target, enabled, root, threshold, rootMargin, onIntersect]);

  return { setTarget };
};

export default useIntersectionObserver;
