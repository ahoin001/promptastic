import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css"; // Imports Global styles here to be used for entire application

export const metadata = {
  description: "Discover & Share Prompts for Writing",
  title: "Promptastic",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
