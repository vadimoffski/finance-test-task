/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fulfilled, pending, rejected } from './redux/app/tickerSlice';
import { io } from "socket.io-client";


const App = () => {
  const socket = io(`${process.env.REACT_APP_WS_URI}`);
  const dispatch = useDispatch()
  const store = useSelector((store) => store.ticker)
  console.log(store);

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
  }, [])

  return (
    <><h2>hello</h2></>
  );
}

export default App;
