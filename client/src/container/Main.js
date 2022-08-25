/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Suspense } from 'react';
import { fulfilled, pending, rejected, timeHandler, switcher } from '../redux/app/tickerSlice';
import { io } from "socket.io-client";
import { FormHelperText } from '@mui/material';

const Error = React.lazy(() => import('../components/Error'));
const CustomTable = React.lazy(() => import('../components/CustomTable'));

const Main = () => {
  const socket = io(`${process.env.REACT_APP_WS_URI}`);
  const dispatch = useDispatch()
  const { data, error, status, isOn, time } = useSelector(({ ticker }) => ticker)


  useEffect(() => {
    if (isOn) {
      try {
        dispatch(pending())
        socket.emit('start')
        socket.on('ticker', (response) => {
          const res = Array.isArray(response) ? response : [response]
          dispatch(fulfilled(res))
        })
      }
      catch (error) {
        dispatch(rejected(error))
      }
    } else {
      socket.emit('close')
      socket.close()
    }
    return () => {
      socket.close();
    };
  }, [isOn])

  useEffect(() => (
    socket.emit('interval', time)
  ), [time])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {(error || status === 'rejected') && <Error />}
      {data && status === 'resolved' && <CustomTable rows={data} />}
      <Box >
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Interval</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={time}
              label="Age"
              onChange={(event) => dispatch(timeHandler(event.target.value))}
            >
              <MenuItem value={3000}>3s</MenuItem>
              <MenuItem value={5000}>5s</MenuItem>
              <MenuItem value={7000}>7s</MenuItem>
            </Select>
            <FormHelperText>Interval time</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label"></InputLabel>
            <Select
              value={isOn}
              onChange={(event) => dispatch(switcher(event.target.value))}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={true}>On</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
            <FormHelperText>on/off tickers</FormHelperText>
          </FormControl>
        </div>
      </Box>
    </Suspense >
  )
}

export default Main