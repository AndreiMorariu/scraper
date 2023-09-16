import { useState } from 'react';

import styles from './Header.module.css';
import Scraper from '/scraper.svg';

function Header({
  setDataEmag,
  setDataOlx,
  setLoading,
  selected,
  setSelected,
}) {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setVisible(false);
      const response = await fetch('https://localhost:3000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ search }),
      });
      setSearch('');
      const { emagData, olxData } = await response.json();
      setDataOlx(olxData);
      setDataEmag(emagData);
      setLoading(false);
      setVisible(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setSearch('');
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>
        Scrape <img src={Scraper} alt='' className={styles.svg} />
      </h1>
      <form className={styles.headerForm} onSubmit={handleFormSubmit}>
        <input
          className={styles.headerInput}
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className={styles.headerBtn}>
          Scrape
        </button>
      </form>
      {visible && (
        <select
          className={styles.selectBtn}
          onClick={(e) => setSelected(e.target.value)}
        >
          <option value='all data'>All data</option>
          <option value='emag'>Emag data</option>
          <option value='olx'>Olx data</option>
        </select>
      )}
    </header>
  );
}

export default Header;
