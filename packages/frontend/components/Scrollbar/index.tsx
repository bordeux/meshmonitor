import { forwardRef } from "react";
import { ScrollbarProps, Scrollbars } from "react-custom-scrollbars-2";

import { Box, useTheme } from "@mui/material";

const Scrollbar = forwardRef<Scrollbars, ScrollbarProps>(
  ({ children, ...rest }, ref) => {
    const theme = useTheme();

    return (
      <Scrollbars
        ref={ref}
        autoHide
        renderThumbVertical={() => {
          return (
            <Box
              sx={{
                width: 5,
                background: `${theme.colors.alpha.black[10]}`,
                borderRadius: `${theme.general.borderRadiusLg}`,
                transition: `${theme.transitions.create(["background"])}`,

                "&:hover": {
                  background: `${theme.colors.alpha.black[30]}`,
                },
              }}
            />
          );
        }}
        {...rest}
      >
        {children}
      </Scrollbars>
    );
  },
);

export default Scrollbar;
