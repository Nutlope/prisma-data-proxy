import styles from "../styles/User.module.css";

function User({ firstName, lastName, avatar, email }) {
  return (
    <div className={styles.container}>
      <img src={avatar} className={styles.image} />
      <div className={styles.name}>
        {firstName} {"  "}
        {lastName}
        <div className={styles.email}>{email}</div>
      </div>
    </div>
  );
}

export default User;
