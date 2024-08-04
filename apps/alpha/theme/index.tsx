import React, { useMemo } from "react";
import {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";

import { useIsDarkMode } from "@symmio/frontend-sdk/state/user/hooks";
import { Colors, Shadows } from "./styled";
import { useRouter } from "next/router";

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
  upToExtraLarge: 1600,
};

export enum Z_INDEX {
  deprecated_zero = 0,
  deprecated_content = 1,
  dropdown = 1000,
  sticky = 1020,
  fixed = 1030,
  modalBackdrop = 1040,
  offcanvas = 1050,
  modal = 1060,
  popover = 1070,
  tooltip = 1080,
}

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

const white = "#FFFFFF";
const black = "#000000";

export enum SupportedThemes {
  LIGHT = "light",
  DARK = "dark",
}

function colors(): Colors {
  // define color scheme for each supported theme
  const themeColors = {
    [SupportedThemes.DARK]: {
      themeName: SupportedThemes.DARK,

      // base
      white,
      black,

      // text
      text0: "#F1F1F1",
      text1: "#A0A2C5",
      text2: "#8B8E9F",
      text3: "#FFFFFF",
      text4: "#5F607F",
      text5: "#4E5273",
      text7: "#B2B5BE",
      text8: "#FFFFFF",

      // these colors aren't for monolith
      text6: "#dce7eb",

      // backgrounds / greys
      bg: "#11141d",
      bg0: "#131722",
      bg1: "#181C27",
      bg2: "#272d3f",
      bg3: "#323b52",
      bg4: "#4E4F73",
      bg5: "#191C4B",
      bg6: "#323860",
      bg7: "#3C3F72",
      bg8: "#050128",
      bg9: "#5CDCF0",
      bgTransparent: "00FFFFFF",
      bgSelected: "rgba(53, 47, 92, 0.5)",

      bgWin: "#20302F",
      bgLoose: "#35232B",
      bgWarning: "#270902",

      // borders
      border1: "#363A45",
      border2: "#121220",
      border3: "#2A2E39",

      //gradient colors
      hoverGrad: "linear-gradient(90deg, #B100DE 0%, #D800B7 100%)",
      primaryGrad: "linear-gradient(90deg, #D800B7 0%, #B100DE 100%)",
      pinkGrad: "linear-gradient(90deg, #D600B8 0%, #C300CC 50%, #B100DE 100%)",
      hoverLong:
        "linear-gradient(90deg, #1C2C18 0%, #10CC00 50%, #234015 100%)",
      primaryBlackNew: "#121419",
      primaryDisable: "#496C7B",
      primaryDarkBg: "#35474F",
      shadow: "rgba(214, 0, 184, 0.5)",
      CTAPink: "#D800B7",
      icons: "#C461DA",
      disabledButton: "#ffffff40",
      hover: "#1E1E30",
      primaryBlue: "#AEE3FA",
      primaryDark: "#5E95AC",
      hoverSecondaryButton: "#20003E",
      primaryDarkOld: "#141517",

      // primary colors
      primary0: "#565CF3",
      primary1: "rgba(217, 217, 217, 0.1)",
      primary2: "#231E61",
      primary3: "#14103D",

      // these colors aren't for monolith
      primary4: "#818188",
      primary5: "linear-gradient(270deg, #01AEF3 -1.33%, #14E8E3 100%)",
      primary6: "linear-gradient(-90deg, #B63562 10%, #CF8D49 90%)",
      primary7: "linear-gradient(90deg, #ff538f 10%, #ffb56c 90%)",
      primary8: "linear-gradient(90deg, #F78C2A 0%, #F34038 100%)",

      // other
      red1: "#F23545",
      green1: "#0A9981",
      green2: "#304349",
      green3: "#6ff37b",
      green4: "#97d136",
      greenButton: "#4D9654",
      redButton: "#C92B77",
      error: "#BC2D36",
      error1: "#9B4C4C",
      success: "#27AE60",
      warning: "#C7166B",
      chartStroke: "#0000AF",
      twitter: "#69a1f5",
      peppyTransparent: "rgba(233, 232, 237, 0.5)",
      peppyTransparentSelected: "rgba(53, 47, 92, 0.5)",

      usdt: "#50AF95",

      //these colors aren't for monolith
      black2: "#151A1F",
      secondary1: "#1749FA",
      secondary2: "rgba(23, 73, 250, 0.2)",
      secondaryButton: "#29004F",
      Link: "#26FFFE",
      red2: "#F82D3A",
      red3: "#D60000",
      red5: "#442B37",
      red6: "#271515",
      yellow1: "#E3A507",
      yellow2: "#FF8F00",
      yellow3: "#F3B71E",
      yellow4: "#FFBA93",
      yellow5: "#A88D62",
      blue1: "#2172E5",
      blue2: "#74c2e3",
      darkPink: "#de4a7b",
      orange: "#E59C46",
      darkOrange: "#391D12",
    },
  };
  // default the theme to light mode
  return themeColors[SupportedThemes.DARK];
}

// define shadow scheme for each supported theme
function shadows(themeName: SupportedThemes): Shadows {
  const themeShadows = {
    [SupportedThemes.LIGHT]: {
      shadow1: "#2F80ED",
      boxShadowDropdown:
        "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
      boxShadowModal:
        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;",
    },
    [SupportedThemes.DARK]: {
      shadow1: "#000",
      boxShadowDropdown:
        "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
      boxShadowModal:
        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;",
    },
  };
  // default the theme to light mode
  return themeName in SupportedThemes
    ? themeShadows[SupportedThemes.LIGHT]
    : themeShadows[themeName];
}

function theme(themeName: SupportedThemes): DefaultTheme {
  return {
    ...colors(),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    ...shadows(themeName),

    //fonts
    fonts: {
      main: "Space Grotesk, sans-serif",
    },

    // media queries
    mediaWidth: mediaWidthTemplates,
  };
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // get theme name from url if any
  const router = useRouter();
  const parsed = router.query?.theme;
  const parsedTheme = parsed && typeof parsed === "string" ? parsed : undefined;

  const darkMode = useIsDarkMode();

  let themeName: SupportedThemes;
  if (
    parsedTheme &&
    Object.values(SupportedThemes).some(
      (theme: string) => theme === parsedTheme
    )
  ) {
    themeName = parsedTheme as SupportedThemes;
  } else {
    themeName = darkMode ? SupportedThemes.DARK : SupportedThemes.LIGHT;
  }

  const themeObject = useMemo(() => theme(themeName), [themeName]);

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.text0};
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    background-color: ${({ theme }) => theme.bg};
  }

  a {
    color: ${({ theme }) => theme.text0}; 
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 16px;
    font-weight:700;
    border-radius: 2px;
  }

  button {
    all: unset;
    cursor: pointer;
    padding: 0px;
  }

  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  * {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    // overflow-y: hidden;
  }
  *::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  .boxStyling {
    background-color: ${({ theme }) => theme.bg1};
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.border1};
    backdrop-filter: blur(15px);
  }

  .noDecoration {
    text-decoration: none;
  }
`;
