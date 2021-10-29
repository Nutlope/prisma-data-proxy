function List({ data }) {
  return (
    <div>
      <h1>Listing some random stuff here</h1>
      <ul>
        {data &&
          data.map((obj) => <li key={obj.description}>{obj.description}</li>)}
      </ul>
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
