import { handler as nodeInfo } from "./nodeInfo.js";
import { handler as neighborInfo } from "./neighborInfo.js";
import { handler as position } from "./position.js";
import { handler as telemetry } from "./telemetry.js";
import { handler as text } from "./text.js";
import { handler as routeDiscovery } from "./routeDiscovery.js";
import { handler as routing } from "./routing.js";
import { handler as mapReport } from "./mapReport.js";
import { handler as storeAndForward } from "./storeAndForward.js";
import { DataFrame, DecodePayloadTypes } from "../helpers/decodeMQTTMessage";
import { RecordId } from "surrealdb";
import { TopicMetadata } from "../helpers/decodeTopic";

export interface HandlerArguments<T extends DecodePayloadTypes> {
  message: DataFrame<T>;
  metadataId: RecordId<string>;
  logId: RecordId<string>;
  topicMetadata: TopicMetadata;
}

type Handler = (props: HandlerArguments<any>) => Promise<void>;

const routes: Record<string, Handler> = {
  "meshtastic.User": nodeInfo,
  "meshtastic.NeighborInfo": neighborInfo,
  "meshtastic.Position": position,
  "meshtastic.Telemetry": telemetry,
  "meshtastic.Text": text,
  "meshtastic.RouteDiscovery": routeDiscovery,
  "meshtastic.Routing": routing,
  "meshtastic.MapReport": mapReport,
  "meshtastic.StoreAndForward": storeAndForward,
};

export default routes;
