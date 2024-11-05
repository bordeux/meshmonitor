import * as React from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useLiveRecord } from "../../services/db/useQuery.ts";
import { RecordId } from "surrealdb";
import type { Node } from "../../../shared/Schemas/NodeSchema.ts";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { generatePath } from "../../helpers/generatePath.ts";

const Map: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, loaded } = useLiveRecord<Node>(
    new RecordId<string>("node", String(params.nodeId)),
  );

  if (!loaded) {
    return null;
  }

  if (data?.position) {
    return (
      <Navigate
        to={
          generatePath("/map/:lat/:long/:zoom", {
            lat: String(data.position.coordinates[0]),
            long: String(data.position.coordinates[1]),
            zoom: String(16),
          }) +
          "?node=" +
          String(data.id.id)
        }
      />
    );
  }

  const onClose = () => {
    navigate("/node", { replace: true });
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Alert
            severity="info"
            style={{
              maxWidth: 500,
              margin: "auto",
              marginTop: "50px",
            }}
          >
            Selected node do not have position data.
          </Alert>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Map;
