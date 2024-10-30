import * as React from "react";
import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Suspense from "../../components/Suspense";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Helmet } from "../../components/Helmet";

const NodeTimeLine = React.lazy(() => import("../../components/NodeTimeLine"));

const ContentContainer = styled(Box)`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TimeLine: React.FC = () => {
  const { nodeId } = useParams();
  const { t } = useTranslation("timeline");

  const navigate = useNavigate();

  const onClose = () => {
    navigate("/node", { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>{t("timeline")}</title>
      </Helmet>
      <Dialog fullScreen open={true}>
        <AppBar sx={{ position: "relative" }} style={{ padding: 10 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {t("timeline")}
            </Typography>
            <IconButton edge="start" color="inherit" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <ContentContainer>
          <Suspense>
            <NodeTimeLine nodeId={String(nodeId)} />
          </Suspense>
        </ContentContainer>
      </Dialog>
    </>
  );
};

export default TimeLine;
