import React from "react";
import "./Headerop.css";
import { Avatar } from "@material-ui/core";

function Headerop({ title, Icon, avatar, onClick }) {
  return (
    <div onClick={onClick} className="headerop">
      {Icon && <Icon className="headerop_icons" />}
      {avatar && <Avatar className="headerop_icons"></Avatar>}
      <h3 className="title">{title}</h3>
    </div>
  );
}

export default Headerop;
