// TODO Polishing
//  Add loading states
//  Make profile page require authentication

import "@mantine/core/styles.css"; // Imports Mantine styles here to be used for entire application
import "@styles/globals.css"; // Imports Global styles here to be used for entire application

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import QueryProvider from "./providers/QueryProvider";

export const metadata = {
  description: "Discover & Share Prompts for Writing",
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
