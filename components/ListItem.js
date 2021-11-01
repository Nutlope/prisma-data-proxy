import styles from "../styles/ListItem.module.css";

function ListItem({ item }) {
  return <div className={styles.container}>{item}</div>;
}

export default ListItem;
