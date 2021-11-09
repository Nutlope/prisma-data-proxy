import styles from "../styles/User.module.css";
import Image from "next/image";

function User({ firstName, lastName, avatar, email }) {
  return (
    <div className={styles.container}>
      <Image src={avatar} className={styles.image} width="50px" height="50px" />
      <div className={styles.name}>
        {firstName} {"  "}
        {lastName}
        <div className={styles.email}>{email}</div>
      </div>
    </div>
  );
}

export default User;
