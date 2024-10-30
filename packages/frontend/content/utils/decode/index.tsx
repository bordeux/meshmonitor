import * as React from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@mui/material";
import ReactJson from "react-json-view";
import { decodeMessage } from "./decodeMessage.ts";
import { useTranslation } from "react-i18next";

const Decode: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation("utils");

  const [value, setValue] = React.useState<string>("");
  return (
    <Box p={5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={<Typography variant="h3">{t("message_decoder")}</Typography>}
            subheader={t("message_decoder.description")}
          />
          <CardContent>
            <TextareaAutosize
              style={{
                width: "100%",
                minHeight: "300px",
                padding: "10px",
              }}
              placeholder={t("message_decoder.placeholder")}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </CardContent>

          {value && (
            <CardContent>
              <Typography variant="h4" mb={2}>
                {t("decoded_message")}
              </Typography>

              <ReactJson
                src={decodeMessage(value)}
                style={{
                  backgroundColor: theme.palette.grey[100],
                  padding: "1rem",
                }}
                name={"message"}
              />
            </CardContent>
          )}
        </Card>
      </Grid>
    </Box>
  );
};
export default Decode;
