// This is to demo prisma with Next.js
import useSWR from "swr";
import { useState } from "react";
import styles from "../styles/Contacts.module.css";
import User from "../components/User";

function Contacts() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR("/api/posts", fetcher, {
    refreshInterval: 1000,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { fname, lname, email, avatar };
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
    <>
      <h2 className={styles.logo}>Contactz</h2>
      <hr className={styles.hr} />
      <div className={styles.container}>
        <div className={styles.section1}>
          <h1>Add a Contact</h1>
          <form className="form" onSubmit={submitHandler}>
            <input
              type="text"
              className="form-field"
              placeholder="First Name"
              autoFocus
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
            <input
              type="text"
              className="form-field"
              placeholder="Last Name"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
            />
            <input
              type="email"
              className="form-field"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="text"
              className="form-field"
              placeholder="Avatar"
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
            />
            <input type="submit" value="Submit" className="submit-btn" />
          </form>
        </div>
        <div className={styles.section2}>
          <h1>Contacts</h1>
          {!data && "There is no data"}
          {data &&
            data.map(({ firstName, lastName, avatar, email, id }) => (
              <User
                key={id}
                firstName={firstName}
                lastName={lastName}
                avatar={avatar}
                email={email}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Contacts;
