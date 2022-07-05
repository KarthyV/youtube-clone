import { Typography } from "@mui/material";
import React from "react";

const SideBarRow = ({ title, Icon, selected }) => {
  return (
    <div className={`SideBarRow ${selected ? "selected" : ""}`}>
      <Icon className="SideBarRow__Icon" />
      <Typography variant="h6" className="SideBarRow__title">
        {title}
      </Typography>
    </div>
  );
};

export default SideBarRow;
