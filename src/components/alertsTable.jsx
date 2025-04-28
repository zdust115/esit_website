import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * Componente che riceve un array di oggetti alerts e li visualizza in tabella.
 * @param {{ data: Array<{ alert_pk: string, humidity: number, temperature: number, state: string }> }} props
 */
export default function AlertsTable({ data }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Table aria-label="Alerts Data Table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Alert PK</strong></TableCell>
            <TableCell><strong>Humidity</strong></TableCell>
            <TableCell><strong>Temperature</strong></TableCell>
            <TableCell><strong>State</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.alert_pk} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.alert_pk}</TableCell>
              <TableCell>{row.humidity}</TableCell>
              <TableCell>{row.temperature}</TableCell>
              <TableCell>{row.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}