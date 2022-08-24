/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fulfilled, pending, rejected } from '../redux/app/tickerSlice';
import { io } from "socket.io-client";
import Error from '../components/Error';
import { cellsTitle, companies } from '../utils/constants'
import CustomCell from '../components/CustomCell';

const Main = () => {
  const socket = io(`${process.env.REACT_APP_WS_URI}`);
  const dispatch = useDispatch()
  const { data, error, status } = useSelector(({ ticker }) => ticker)
  const timeHandler = (timeStamp) => (new Date(timeStamp).toLocaleTimeString())

  useEffect(() => {
    try {
      dispatch(pending())
      if (socket.connected) {
        dispatch(rejected(`Server error!`))
      }
      socket.emit('start')
      socket.on('ticker', (response) => {
        const res = Array.isArray(response) ? response : [response]
        dispatch(fulfilled(res))
      })
    }
    catch (error) {
      dispatch(rejected(error))
    }
    return () => {
      socket.removeAllListeners();
    };
  }, [])


  return (
    <>
      {error && status === 'rejected' && <Error />}
      {data && status === 'resolved' && (
        <TableContainer component={Paper} style={{ marginTop: '40px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {cellsTitle.map((title) => (<TableCell key={title} align="center">{title}</TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map(({ change, change_percent, dividend, last_trade_time, price, ticker, yield: yield_1 }) => (
                <TableRow
                  key={ticker}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {companies[ticker]}
                  </TableCell>
                  <TableCell align="center">{ticker}</TableCell>
                  <TableCell align="center">{price}</TableCell>
                  <TableCell align="center">{change}</TableCell>
                  <CustomCell align="center" title={change_percent} />
                  <TableCell align="center">{dividend}</TableCell>
                  <TableCell align="center">{yield_1}</TableCell>
                  <TableCell align="center">{timeHandler(last_trade_time)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default Main