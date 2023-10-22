import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark", // 'dark' | 'light'
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
