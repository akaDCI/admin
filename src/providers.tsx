"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "styled-components";
import StyledComponentsRegistry from "./services/base/styledComponentsRegistry";
import { themes } from "./style/themes";
import GlobalStyle from "./style/global";
import { App, ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./store";

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={themes.default}>
        <GlobalStyle />
        <AntdRegistry>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: themes.default.colors.primary,
                  algorithm: true,
                },
                Input: {
                  paddingBlock: 8,
                },
                Typography: {
                  titleMarginBottom: 0,
                  titleMarginTop: 0,
                },
                Table: {
                  headerBg: themes.default.colors.primary,
                  headerColor: themes.default.colors.textWhite,
                  headerBorderRadius: 0,
                },
                Select: {
                  controlHeight: 40,
                },
              },
              token: {
                colorPrimary: themes.default.colors.primary,
              },
            }}
          >
            <App>
              <Provider store={store}>{children}</Provider>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}

export default Providers;
