// pages/sensor-data.jsx
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import SensorDataTable from '../components/SensorDataTable';
import dynamic from 'next/dynamic';

const SensorDataTable = dynamic(() => import('../components/SensorDataTable'), {
  ssr: false,
});

export default function SensorDataPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/api/sensorsData')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Sensor Data</h1>
      <SensorDataTable data={data} />
    </main>
  );
}
