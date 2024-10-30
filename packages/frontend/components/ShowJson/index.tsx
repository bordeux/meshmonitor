import * as React from "react";
import { lazy } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Suspense from "../../components/Suspense";
import { useTranslation } from "react-i18next";

const ReactJson = lazy(() => import("react-json-view"));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface ShowJsonProps {
  data: any;
  onClose: () => void;
  title: string;
  name?: string;
}

const ShowJson: React.FC<ShowJsonProps> = ({ data, onClose, title, name }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <BootstrapDialog onClose={onClose} open={true} fullWidth={true}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Suspense>
          <ReactJson
            src={data}
            style={{
              backgroundColor: theme.palette.grey[100],
              padding: "1rem",
            }}
            name={name}
          />
        </Suspense>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          {t("close")}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default ShowJson;
