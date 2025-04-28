// pages/sensors-data.jsx
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const SensorDataTable = dynamic(() => import('../components/SensorDataTable'), {
  ssr: false,
});

export default function SensorDataPage() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10; // Numero di record da caricare per volta

  const fetchData = (newOffset) => {
    axios
      .get(`/api/sensors-data?offset=${newOffset}&limit=${limit}`)
      .then((res) => {
        if (res.data.length < limit) {
          setHasMore(false); // Non ci sono più dati da caricare
        }
        setData((prevData) => [...prevData, ...res.data]);
      })
      .catch((err) => console.error(err));
  };

  /* useEffect(() => {
    //fetchData(offset);
    console.log("offset: ", offset);
  }
  , [offset]); */
  // Carica i dati iniziali quando il componente viene montato
 
  const loadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchData(newOffset);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Sensor Data</h1>
      <SensorDataTable data={data} />
      {hasMore && (
        <button onClick={loadMore} style={{ marginTop: '1rem' }}>
          Mostra Altro
        </button>
      )}
    </main>
  );
}
