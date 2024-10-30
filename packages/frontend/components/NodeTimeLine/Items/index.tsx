import Text from "./Text.tsx";
import NeighborInfo from "./NeighborInfo.tsx";
import Position from "./Position.tsx";
import User from "./User.tsx";
import Telemetry from "./Telemetry.tsx";
import Route from "./Route.tsx";

export const ItemTypes = {
  "meshtastic.Text": Text,
  "meshtastic.NeighborInfo": NeighborInfo,
  "meshtastic.User": User,
  "meshtastic.Position": Position,
  "meshtastic.Telemetry": Telemetry,
  "meshtastic.RouteDiscovery": Route,
};
