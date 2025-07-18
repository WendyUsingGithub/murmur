import { useState, useRef } from "react";

function useAccordionOverflowX() {
  const [isExpand, setExpand] = useState(false);
  const accordionRef = useRef(null);

  function expand() {
    setExpand(true);
    if (accordionRef.current) {
      accordionRef.current.style.maxHeight = `${accordionRef.current.scrollHeight}px`;
      setTimeout(() => {
        accordionRef.current.style.overflow = "visible";
      }, 50);
    }
  }

  function collapse() {
    if (accordionRef.current) {
      accordionRef.current.style.maxHeight = "0px";
      accordionRef.current.style.overflow = "hidden";
    }
    setExpand(false);
  }

  function toggle() {
    if (isExpand) {
      collapse();
    } else {
      expand();
    }
  }

  return {isExpand, accordionRef, expand, collapse, toggle};
}

export default useAccordionOverflowX;