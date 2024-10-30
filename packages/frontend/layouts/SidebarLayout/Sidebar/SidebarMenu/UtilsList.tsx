import { Button, List, ListItem, ListSubheader } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { SubMenuWrapper } from "./SubMenuWrapper";
import { useTranslation } from "react-i18next";
import FactoryIcon from "@mui/icons-material/Factory";
interface MediaProps {
  closeSidebar: () => void;
}

export const UtilsList = ({ closeSidebar }: MediaProps) => {
  const { t } = useTranslation();

  return (
    <List
      component="div"
      subheader={
        <ListSubheader component="div" disableSticky>
          {t("utils")}
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
              to="/utils/decode"
              startIcon={<FactoryIcon />}
            >
              {t("decodeMessage")}
            </Button>
          </ListItem>
        </List>
      </SubMenuWrapper>
    </List>
  );
};
