import React, { useRef, useEffect } from "react";
import TableauReport from "tableau-react";

const { tableau } = window;

function TablueTry() {
  const ref = useRef(null);
  const url = "https://public.tableau.com/views/RFMAnalysisNew/Dashboard1";
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
      <h1>RFM Analysis</h1>
      <div ref={ref}></div>
    </div>
  );
}

export default TablueTry;
