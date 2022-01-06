// Header will form part of each page using the layout
import Header from "./Header";
//imporing Head to add CDN links to
import Head from "next/head";

const Layout = (props) => {
  return (
    <div>
      <Head>
        {/* using react-bootstrap for some of the styles */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        {/* Fonts from Google fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div>
        <Header />

        {props.children}
        <style global jsx>
          {`
            body {
              background: #e8f1ff;
              margin: 0;
              padding: 1em;
            }
            h1,
            h2,
            h3,
            p {
              font-family: "Roboto", sans-serif;
              color: #3b75d9;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Layout;
