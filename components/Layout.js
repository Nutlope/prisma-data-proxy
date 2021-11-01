import Head from "next/head";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Default title baby</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      {children}
    </div>
  );
}

export default Layout;
