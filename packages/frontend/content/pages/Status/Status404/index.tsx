import {
  Box,
  Button,
  Card,
  Container,
  styled,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Helmet } from "../../../../components/Helmet";

const MainContent = styled(Box)`
  height: 100%;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Status404() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography variant="h2" sx={{ my: 2 }}>
              {t("404.title")}
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              {t("404.subtitle")}
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: "center", mt: 3, p: 4 }}>
              <Button href="/" variant="outlined">
                {t("404.button")}
              </Button>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
