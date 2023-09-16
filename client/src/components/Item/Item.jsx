import styles from './Item.module.css';

function Item({ item }) {
  return (
    <li className={styles.item}>
      <img src={item.image} alt={item.name} className={styles.itemImage} />

      <div className={styles.itemTextContent}>
        <span className={styles.itemName}>{item.name}</span>
        <p className={styles.itemPrice}>{item.price}</p>
        <a
          href={item.link}
          className={styles.itemLink}
          target='_blank'
          rel='noreferrer'
        >
          Check It
        </a>
      </div>
    </li>
  );
}

export default Item;
