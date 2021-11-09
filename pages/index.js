import useSWR from "swr";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import User from "../components/User";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR("/api/posts", fetcher, {
    refreshInterval: 1000,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { firstName, lastName, email, avatar };
      await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast.success("Contact Added");
    } catch (error) {
      console.error(error);
    }
  };

  const resetInputFields = () => {
    setTimeout(() => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setAvatar("");
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Contactz</title>
        <meta name="description" content="A minimalistic contacts app" />
      </Head>
      <header>
        <h2 className={styles.logo}>Contactz</h2>
        <hr className={styles.hr} />
      </header>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Add a Contact</h1>
          <form className="form" onSubmit={submitHandler}>
            <input
              type="text"
              className="form-field"
              placeholder="First Name"
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <input
              type="text"
              className="form-field"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
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
            <input
              type="submit"
              value="Submit"
              className="submit-btn"
              onClick={resetInputFields}
            />
            <Toaster />
          </form>
        </div>
        <div className={styles.right}>
          <h1>Contacts</h1>
          {(!data || data.length == 0) && "You have no contacts."}
          {error && `Error: ${error}`}
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
