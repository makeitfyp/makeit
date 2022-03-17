import React from "react";
import "./Sidebar.css";

function Recents() {
  const recentitems = (topic) => (
    <div className="recentitems">
      <span className="hashtag"># {topic}</span>
    </div>
  );
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <h2>Recents</h2>
      </div>
      <div className="sidebar_stats">
        {recentitems("Comsats")}
        {recentitems("FYP")}
        {recentitems("MakeIt")}
        {recentitems("Abubakar")}
        {recentitems("Malik Salman")}
      </div>
    </div>
  );
}

export default Recents;
