import { Box, styled } from "@mui/material";

const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`,
);

export default RootWrapper;
