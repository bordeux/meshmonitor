import { useRoutes } from "react-router-dom";
import router from "./router";

import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import Suspense from "./components/Suspense";
import { UserProvider } from "./contexts/UserContext.tsx";

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <UserProvider>
        <CssBaseline />
        <Suspense>{content}</Suspense>
      </UserProvider>
    </ThemeProvider>
  );
}
export default App;
