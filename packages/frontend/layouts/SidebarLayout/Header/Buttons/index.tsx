import { Box } from "@mui/material";
import HeaderSearch from "./Search";
import HeaderNotifications from "./Notifications";
import Language from "./Language";

function HeaderButtons() {
  const val = 2 as number;

  return (
    <Box sx={{ mr: 1 }}>
      {1 === val && <HeaderSearch />}
      <Box sx={{ mx: 0.5 }} component="span">
        {1 === val && <HeaderNotifications />}
        <Language />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
