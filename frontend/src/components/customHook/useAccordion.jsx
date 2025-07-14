import { useState, useRef } from "react";

function useAccordion() {
  const [isExpand, setExpand] = useState(false);
  const accordionRef = useRef(null);

  function expand() {
    setExpand(true);
    if (accordionRef.current) {
      accordionRef.current.style.maxHeight = `${accordionRef.current.scrollHeight}px`;
      console.log("expand", accordionRef.current.style.maxHeight);
    }
  }

  function collapse() {
    if (accordionRef.current) {
      accordionRef.current.style.maxHeight = "0px";
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

export default useAccordion;