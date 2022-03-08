import React from "react";
import "./Inputoption.css";
function Inputoptions({ Icon, title, color }) {
  return (
    <div className="Inputoptions">
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
}

export default Inputoptions;
