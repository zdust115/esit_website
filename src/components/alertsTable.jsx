import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';

/**
 * Componente che riceve un array di oggetti alerts e li visualizza in tabella.
 * @param {{ data: Array<{ alert_pk: string, humidity: number, temperature: number, state: string }> }} props
 */
export default function AlertsTable({ data }) {
  console.log('AlertsTable data:', data);
  const handleUpdate = (alert_pk) => {
    console.log('Updating alert with pk:', alert_pk);
    axios
      .put('/api/alerts', { alert_pk })
      .then((res) => {
        alert(`Alert ${alert_pk} aggiornato con successo!`);
        // Puoi aggiungere un callback per aggiornare i dati localmente o ricaricare la tabella
      })
      .catch((err) => {
        console.error(err);
        alert(`Errore durante l'aggiornamento di ${alert_pk}`);
      });
  };
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Table aria-label="Alerts Data Table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Timestamp</strong></TableCell>
            <TableCell><strong>Sensor ID</strong></TableCell>
            <TableCell><strong>Temperature</strong></TableCell>
            <TableCell><strong>Humidity</strong></TableCell>
            <TableCell><strong>State</strong></TableCell>
            <TableCell><strong>Manage</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => {
            // split del campo sensor_data_pk in timestamp e id sensore
            const [timestamp, sensorId] = row.alert_pk.split('-');
            return (

              <TableRow key={row.alert_pk} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{timestamp}</TableCell>
                <TableCell>{sensorId}</TableCell>
                <TableCell>{row.temperature}</TableCell>
                <TableCell>{row.humidity}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>
                  {row.state === 'active' && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        console.log('Updating alert with pk:', row.alert_pk);
                        handleUpdate(row.alert_pk)}}
                    >
                      Solve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}