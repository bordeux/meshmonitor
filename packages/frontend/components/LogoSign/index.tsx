import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        text-decoration: none;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
        display: block;
`,
);

const LogoSignWrapper = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Logo() {
  return (
    <LogoWrapper to="/">
      <LogoSignWrapper>
        <img src={"/static/images/logo/logo.svg"} alt="logo" width={150} />
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export default Logo;
