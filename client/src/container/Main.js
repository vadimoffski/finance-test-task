/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, Suspense } from 'react';
import { fulfilled, pending, rejected } from '../redux/app/tickerSlice';
import { io } from "socket.io-client";

const Error = React.lazy(() => import('../components/Error'));
const CustomTable = React.lazy(() => import('../components/CustomTable'));

const Main = () => {
  const socket = io(`${process.env.REACT_APP_WS_URI}`);
  const dispatch = useDispatch()
  const { data, error, status } = useSelector(({ ticker }) => ticker)

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
    <Suspense fallback={<div>Loading...</div>}>
      {(error || status === 'rejected') && <Error />}
      {data && status === 'resolved' && <CustomTable rows={data} />}
    </Suspense>
  )
}

export default Main