import * as React from "react";
import { Box, IconButton, Modal } from "@mui/material";
import { useLiveRecord } from "../../services/db/useQuery.ts";
import { RecordId } from "surrealdb";
import type { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Suspense from "../../components/Suspense";
import { lazy } from "react";

const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vh;
  height: 80vh;
`;

const NodeMap = lazy(() => import("../../components/NodeMap"));

const Map: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useLiveRecord<Node>(
    new RecordId<string>("node", String(params.nodeId)),
  );

  const onClose = () => {
    navigate("/node", { replace: true });
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Container>
        <IconButton
          sx={(theme) => ({
            position: "absolute",
            right: -5,
            top: -5,
            zIndex: 1000,
            color: theme.palette.grey[500],
            background: theme.palette.grey[100],
          })}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Suspense>{data && <NodeMap node={data} />}</Suspense>
      </Container>
    </Modal>
  );
};

export default Map;
