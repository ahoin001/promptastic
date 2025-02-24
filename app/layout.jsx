// Imports styles here to be used for entire application
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@styles/globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

import { Notifications } from "@mantine/notifications";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import QueryProvider from "./providers/QueryProvider";

export const metadata = {
  description: "Discover & Share Prompts for Writing",
  icons: { icon: "/favicon.ico" },
  title: "Promptastic",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <QueryProvider>
              <MantineProvider>
                <Notifications color="teal" position="top-center" />
                <Nav />
                {children}
              </MantineProvider>
            </QueryProvider>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
