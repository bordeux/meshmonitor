import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Locales from "../../../../../locales";

function HeaderSynchronizations() {
  const { t, i18n } = useTranslation();

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const CurrentLocale = Locales[i18n.language as keyof typeof Locales];
  const CurrentFlagIcon = CurrentLocale.flags["3x2"];

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title={t("change_language")}>
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <SvgIcon>
            <CurrentFlagIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper sx={{ width: 200, maxWidth: "100%" }}>
          <MenuList>
            {Object.keys(Locales).map((lang) => {
              const locale = Locales[lang as keyof typeof Locales];
              const FlagIcon = locale.flags["3x2"];
              return (
                <MenuItem
                  key={lang}
                  onClick={() => {
                    i18n.changeLanguage(lang);
                    handleClose();
                  }}
                >
                  <ListItemIcon>
                    <SvgIcon>
                      <FlagIcon />
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText>
                    {t("languageName", {
                      lng: lang,
                      ns: "localization",
                    })}
                  </ListItemText>
                </MenuItem>
              );
            })}
          </MenuList>
        </Paper>
      </Popover>
    </>
  );
}

export default HeaderSynchronizations;
