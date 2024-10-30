import { Button, List, ListItem, ListSubheader } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { Map as MapIcon } from "@mui/icons-material";
import { SubMenuWrapper } from "./SubMenuWrapper";
import { useTranslation } from "react-i18next";
import RouterIcon from "@mui/icons-material/Router";
import MessageIcon from "@mui/icons-material/Message";

interface MediaProps {
  closeSidebar: () => void;
}

export const MonitoringList = ({ closeSidebar }: MediaProps) => {
  const { t } = useTranslation();

  return (
    <List
      component="div"
      subheader={
        <ListSubheader component="div" disableSticky>
          {t("monitoring")}
        </ListSubheader>
      }
    >
      <SubMenuWrapper>
        <List component="div">
          <ListItem component="div">
            <Button
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/map"
              startIcon={<MapIcon />}
            >
              {t("map")}
            </Button>
          </ListItem>
          <ListItem component="div">
            <Button
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/node"
              startIcon={<RouterIcon />}
            >
              {t("nodes")}
            </Button>
          </ListItem>
          <ListItem component="div">
            <Button
              disableRipple
              component={RouterLink}
              onClick={closeSidebar}
              to="/message"
              startIcon={<MessageIcon />}
            >
              {t("messages")}
            </Button>
          </ListItem>
        </List>
      </SubMenuWrapper>
    </List>
  );
};
