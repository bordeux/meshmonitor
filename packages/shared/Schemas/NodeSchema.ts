import { z } from "zod";
import { GeometryPoint, RecordId } from "surrealdb";
import { Config_DeviceConfig_Role } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/config_pb";
import { HardwareModel } from "@buf/meshtastic_protobufs.bufbuild_es/meshtastic/mesh_pb";

export const NodeSchema = z.object({
  id: z.instanceof(RecordId),
  long_name: z.string().optional(),
  short_name: z.string().optional(),
  last_heard: z.instanceof(Date).optional(),
  position: z.instanceof(GeometryPoint).optional(),
  position_altitude: z.number().optional(),
  position_precision_bits: z.number().optional(),
  rx_rssi: z.number().optional(),
  rx_snr: z.number().optional(),
  role: z.nativeEnum(Config_DeviceConfig_Role).optional(),
  hw_model: z.nativeEnum(HardwareModel).optional(),
  has_device_metrics: z.boolean().default(false),
  has_environment_metrics: z.boolean().default(false),
  has_message: z.boolean().default(false),
  has_route: z.boolean().default(false),
  has_position: z.boolean().default(false),
  has_info: z.boolean().default(false),
  is_licensed: z.boolean().optional(),
  public_key: z.string().optional(),
  environment_metrics: z.object({}).optional(),
  device_metrics: z.object({}).optional(),
});

export type Node = z.infer<typeof NodeSchema>;
