import { useState } from 'react';

function App() {
  const [search, setSearch] = useState('');
  const [dataEmag, setDataEmag] = useState([]);
  const [dataOlx, setDataOlx] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      fetch('http://localhost:3000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ search }),
      })
        .then((response) => response.json())
        .then(({ emagData, olxData }) => {
          console.log(emagData, olxData);
          setDataOlx(olxData);
          setDataEmag(emagData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setSearch('');
    }
  };

  return (
    <div>
      {loading && <h1>LOADING...</h1>}
      <form action='' onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <main>
        <div>
          <h1>EMAG</h1>
          <ul>
            {dataEmag?.map((e, i) => {
              return (
                <li key={i}>
                  {e.name} <h2>{e.price}</h2>
                  <img src={e.image} alt={e.name} />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h1>OLX</h1>
          <ul>
            {dataOlx?.map((e, i) => {
              return (
                <li key={i}>
                  {e.name} <h2>{e.price}</h2>
                  <img src={e.image} alt={e.name} />
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
