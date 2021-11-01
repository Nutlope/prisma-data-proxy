// This is to demo prisma with Next.js
import useSWR from "swr";
import { useState } from "react";
import styles from "../styles/Contacts.module.css";
import User from "../components/User";

function Contacts({ users }) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [avatar, setAvatar] = useState("");

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR("/api/posts", fetcher, {
    refreshInterval: 1000,
  });
  console.log("data is: ", data);

  const submitHandler = async (e) => {
    // TODO: Use SWR for re-validation
    e.preventDefault();
    try {
      const body = { fname, lname, avatar };
      await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1>Add a Contact</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="fname">First name:</label>
          <br />
          <input
            type="text"
            id="fname"
            name="fname"
            autoFocus
            onChange={(e) => setFname(e.target.value)}
            value={fname}
          />
          <br />
          <label htmlFor="lname">Last name:</label>
          <br />
          <input
            type="text"
            id="lname"
            name="lname"
            onChange={(e) => setLname(e.target.value)}
            value={lname}
          />
          <br />
          <label htmlFor="avatar">Avatar:</label>
          <br />
          <input
            type="text"
            id="avatar"
            name="avatar"
            onChange={(e) => setAvatar(e.target.value)}
            value={avatar}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className={styles.section}>
        <h1>Contacts</h1>
        {data &&
          data.map(({ firstName, lastName, avatar, id }) => (
            <User
              key={id}
              firstName={firstName}
              lastName={lastName}
              avatar={avatar}
            />
          ))}
      </div>
    </div>
  );
}

export default Contacts;
