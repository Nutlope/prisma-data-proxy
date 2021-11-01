import styles from "../styles/List.module.css";
import ListItem from "../components/ListItem";
import Link from "next/link";
import Head from "next/head";

function List({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Some list</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <h1 className={styles.heading}>A list of wonderful coding resources</h1>
      <h2 className={styles.subheading}>
        <Link href="/">Back to Home</Link>
      </h2>
      <div className={styles.list}>
        {data &&
          data.map((obj) => (
            <div className={styles.listItem} key={obj.description}>
              <ListItem item={obj.description} />
            </div>
          ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `https://api.sampleapis.com/codingresources/codingResources`
  );
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default List;
