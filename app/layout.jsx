import Nav from "@components/Nav";
import "@styles/globals.css"; // Imports Global styles here to be used for entire application

export const metadata = {
  description: "Discover & Share Prompts for Writing",
  title: "Promptastic",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
