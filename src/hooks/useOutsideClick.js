import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // Check if the ref exists and if the clicked element (e.target) is outside the referenced element
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    // Attach the event listener to the document
    // Using capturing phase (true) helps prevent conflicts with other click events
    document.addEventListener("click", handleClick, listenCapturing);

    // Clean up the event listener on component unmount to prevent memory leaks
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}