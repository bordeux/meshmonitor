import { fromBinary } from "@bufbuild/protobuf";
import {
  MapReport,
  MapReportSchema,
  ServiceEnvelopeSchema,
} from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mqtt_pb.js";
import { PortNum } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/portnums_pb.js";
import {
  MeshPacket,
  NeighborInfo,
  NeighborInfoSchema,
  Position,
  PositionSchema,
  RouteDiscovery,
  RouteDiscoverySchema,
  Routing,
  RoutingSchema,
  User,
  UserSchema,
  Waypoint,
  WaypointSchema,
} from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb.js";
import {
  Telemetry,
  TelemetrySchema,
} from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/telemetry_pb.js";
import {
  StoreAndForward,
  StoreAndForwardSchema,
} from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/storeforward_pb.js";
import {
  PowerStressMessage,
  PowerStressMessageSchema,
} from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/powermon_pb.js";
import { ProcessingError } from "../errors/ProcessingError";

export interface Text {
  $typeName: "meshtastic.Text";
  text: string;
}

export type DecodePayloadTypes =
  | RouteDiscovery
  | User
  | Position
  | Telemetry
  | NeighborInfo
  | StoreAndForward
  | MapReport
  | PowerStressMessage
  | Waypoint
  | Text
  | Routing;

export interface DataFrame<T extends DecodePayloadTypes>
  extends Omit<MeshPacket, "payloadVariant"> {
  payload: T;
  payloadVariant: undefined;
}

const decodePayload = (value: any): DecodePayloadTypes => {
  switch (value?.portnum) {
    case PortNum.NODEINFO_APP:
      return fromBinary(UserSchema, value.payload);
    case PortNum.POSITION_APP:
      return fromBinary(PositionSchema, value.payload);
    case PortNum.TELEMETRY_APP:
      return fromBinary(TelemetrySchema, value.payload);
    case PortNum.NEIGHBORINFO_APP:
      return fromBinary(NeighborInfoSchema, value.payload);
    case PortNum.STORE_FORWARD_APP:
      return fromBinary(StoreAndForwardSchema, value.payload);
    case PortNum.MAP_REPORT_APP:
      return fromBinary(MapReportSchema, value.payload);
    case PortNum.POWERSTRESS_APP:
      return fromBinary(PowerStressMessageSchema, value.payload);
    case PortNum.TRACEROUTE_APP:
      return fromBinary(RouteDiscoverySchema, value.payload);
    case PortNum.WAYPOINT_APP:
      return fromBinary(WaypointSchema, value.payload);
    case PortNum.ROUTING_APP:
      return fromBinary(RoutingSchema, value.payload);
    case PortNum.TEXT_MESSAGE_APP:
      return {
        $typeName: "meshtastic.Text",
        text: value.payload.toString("utf-8"),
      };
  }

  throw new ProcessingError("Unsupported message PortNum ", null, {
    value,
  });
};

export const decodeMQTTMessage = (message: Buffer) => {
  const payload = fromBinary(ServiceEnvelopeSchema, message);
  const packet = payload.packet as any as DataFrame<any>;
  const payloadVariant = packet.payloadVariant as any;
  let data: DecodePayloadTypes;

  if (!payloadVariant?.case) {
    throw new ProcessingError("Unable to find the variant case", null, {
      payloadVariant,
    });
  }

  if (payloadVariant?.case === "encrypted") {
    return null;
  }

  try {
    data = decodePayload(payloadVariant?.value);
  } catch (e) {
    throw new ProcessingError("Unable to decode payload", e);
  }
  packet["payload"] = data;

  delete packet.payloadVariant;
  return packet;
};
