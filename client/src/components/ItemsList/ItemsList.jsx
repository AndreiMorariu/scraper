import styles from './ItemsList.module.css';

import Item from '../Item/Item';

function ItemsList({ data, title }) {
  return (
    <div className={styles.listContainer}>
      <h1 className={styles.listTitle}>{title}</h1>
      {data !== undefined ? (
        <ul className={styles.list}>
          {data?.map((item, i) => (
            <Item item={item} key={i} />
          ))}
        </ul>
      ) : (
        <h2>No data found for the specified input on {title}</h2>
      )}
    </div>
  );
}

export default ItemsList;
