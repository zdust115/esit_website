import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * Componente che riceve un array di oggetti sensor data e li visualizza in tabella.
 * @param {{ data: Array<{ sensor_data_pk: string, temperature: number, humidity: number }> }} props
 */
export default function SensorDataTable({ data }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Table aria-label="Sensor Data Table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Timestamp</strong></TableCell>
            <TableCell><strong>Sensor ID</strong></TableCell>
            <TableCell><strong>Temperature (°C)</strong></TableCell>
            <TableCell><strong>Humidity (%)</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => {
            // split del campo sensor_data_pk in timestamp e id sensore
            const [timestamp, sensorId] = row.sensor_data_pk.split('-');
            return (
              <TableRow key={row.sensor_data_pk} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{timestamp}</TableCell>
                <TableCell>{sensorId}</TableCell>
                <TableCell>{row.temperature}</TableCell>
                <TableCell>{row.humidity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
