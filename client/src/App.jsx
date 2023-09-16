import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { ColorRing } from 'react-loader-spinner';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ItemsList from './components/ItemsList/ItemsList';

function App() {
  const [dataEmag, setDataEmag] = useState([]);
  const [dataOlx, setDataOlx] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('all data');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) setSelected('all data');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setSelected]);

  return (
    <>
      {isMobile ? (
        <h1 style={{ textAlign: 'center', marginTop: '3rem' }}>
          Mobile version not finished
        </h1>
      ) : (
        <>
          <Header
            setDataEmag={setDataEmag}
            setDataOlx={setDataOlx}
            setLoading={setLoading}
            selected={selected}
            setSelected={setSelected}
          />
          {loading ? (
            <ColorRing
              colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
              height='12rem'
              width='12rem'
              wrapperStyle={{
                position: 'absolute',
                top: '50%',
                right: '50%',
                transform: 'translate(50%, 100%)',
              }}
            />
          ) : (
            <Main>
              {selected === 'all data' && (
                <>
                  <ItemsList data={dataEmag} title='Emag' />
                  <ItemsList data={dataOlx} title='Olx' />
                </>
              )}
              {selected === 'emag' && (
                <ItemsList data={dataEmag} title='Emag' />
              )}
              {selected === 'olx' && <ItemsList data={dataOlx} title='Olx' />}
            </Main>
          )}
        </>
      )}
    </>
  );
}

export default App;
