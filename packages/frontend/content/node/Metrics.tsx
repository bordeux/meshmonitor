import * as React from "react";
import { useLiveRecord } from "../../services/db/useQuery.ts";
import { RecordId } from "surrealdb";
import { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { useNavigate, useParams } from "react-router-dom";
import ShowJson from "../../components/ShowJson";
import { useTranslation } from "react-i18next";

const Metrics: React.FC = () => {
  const { metricType, nodeId } = useParams();
  const navigate = useNavigate();
  const record = useLiveRecord<Node>(
    new RecordId<string>("node", String(nodeId)),
  );
  const { t } = useTranslation("nodes");

  const onClose = () => {
    navigate("/node", { replace: true });
  };

  const metrics = (
    metricType === "device"
      ? record?.device_metrics
      : record?.environment_metrics
  ) as object;

  return (
    <ShowJson
      data={metrics}
      onClose={onClose}
      title={t(`${metricType}_metrics` as any)}
      name={metricType}
    />
  );
};

export default Metrics;
