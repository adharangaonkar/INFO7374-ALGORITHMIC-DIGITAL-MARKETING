import React, { useRef, useEffect } from "react";

const { tableau } = window;

function TableuDash2() {
  const ref = useRef(null);
  const url = "https://public.tableau.com/views/RFM2New/Dashboard1";
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
      <h1>Revenue and Demand Analysis</h1>
      <div ref={ref}></div>
    </div>
  );
}

export default TableuDash2;
