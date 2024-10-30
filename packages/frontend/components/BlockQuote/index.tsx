import React from "react";
import { Box, BoxProps, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface BlockQuoteProps extends BoxProps {
  author?: React.ReactNode;
}

// Styled Blockquote container using Emotion styled
const StyledBlockquote = styled(Box)`
  border-left: 4px solid ${(props) => props.theme.palette.primary.main};
  margin: 20px 0;
  font-style: italic;
  color: ${(props) => props.theme.palette.text.secondary};
  background-color: ${(props) => props.theme.palette.background.default};
  padding: 16px;
  border-radius: 4px;
  display: inline-block;
`;

const BlockQuote: React.FC<BlockQuoteProps> = (props) => {
  return (
    <StyledBlockquote {...props}>
      <Typography variant="body1" component="p">
        {props.children}
      </Typography>
      {props.author && (
        <Typography
          variant="body2"
          component="footer"
          sx={{ textAlign: "right", marginTop: "8px" }}
        >
          — {props.author}
        </Typography>
      )}
    </StyledBlockquote>
  );
};
export default BlockQuote;
