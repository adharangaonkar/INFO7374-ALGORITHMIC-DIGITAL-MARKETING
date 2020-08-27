import React, { useRef, useEffect } from "react";

const { tableau } = window;

function Tablue3() {
  const ref = useRef(null);
  const url =
    "https://public.tableau.com/views/Customer_15973934675310/Dashboard1";
  const options = {
    device: "desktop",
  };
  function initViz() {
    new tableau.Viz(ref.current, url, options);
  }

  useEffect(() => {
    initViz();
  }, []);

  return (
    <div>
      <h1>Customer Analysis</h1>
      <div ref={ref}></div>
    </div>
  );
}

export default Tablue3;
