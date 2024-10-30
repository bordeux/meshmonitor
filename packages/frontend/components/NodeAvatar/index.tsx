import * as React from "react";
import "leaflet/dist/leaflet.css";
import { Avatar } from "@mui/material";
import randomcolor from "randomcolor";

interface NodeAvatarProps {
  shortName: string;
  size?: number;
}

const NodeAvatar: React.FC<NodeAvatarProps> = ({ shortName, size = 56 }) => {
  const color = randomcolor({ seed: shortName });
  return (
    <Avatar sx={{ bgcolor: color, width: size, height: size }}>
      {shortName}
    </Avatar>
  );
};
export default NodeAvatar;
