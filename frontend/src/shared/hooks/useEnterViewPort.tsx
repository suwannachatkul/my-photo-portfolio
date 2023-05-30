import { useState, useEffect, RefObject } from "react";

const OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

const useEnterViewport = (
  elementRef: RefObject<HTMLDivElement>,
  checkOnce: boolean = true
) => {
  const [isEnterViewPort, setIsEnterViewPort] = useState(false);

  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsEnterViewPort(true);
            if (checkOnce) {
                observer.unobserve(elementRef.current!);
            }
          } else {
            setIsEnterViewPort(false);
          }
        });
      }, OPTIONS);
      observer.observe(elementRef.current);
    }
  }, [elementRef, checkOnce]);

  return isEnterViewPort;
};

export default useEnterViewport;
