import styles from "../styles/User.module.css";

function User({ firstName, lastName, email, avatar }) {
  return (
    <div className={styles.container}>
      <img src={avatar} className={styles.image} />
      <div className={styles.name}>
        {firstName} {"  "}
        {lastName}
        {email}
      </div>
    </div>
  );
}

export default User;
