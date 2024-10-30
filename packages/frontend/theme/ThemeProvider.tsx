import { createContext } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";
import useLocalStorageState from "ahooks/es/useLocalStorageState";

const ThemeContext = createContext((): void => {});

interface ThemeProviderWrapperProps {
  children?: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = (props) => {
  const [themeName, setThemeName] = useLocalStorageState("appTheme", {
    defaultValue: "NebulaFighterTheme",
  });
  const theme = themeCreator(String(themeName));

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
