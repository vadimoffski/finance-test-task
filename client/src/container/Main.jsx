import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, Suspense } from 'react'
import { io } from 'socket.io-client'
import { fulfilled, pending, rejected } from '../redux/app/tickerSlice'

import ControlPanel from '../components/ControlPanel'

const Error = React.lazy(() => import('../components/Error'))
const CustomTable = React.lazy(() => import('../components/CustomTable'))

const Main = () => {
  const socket = io(`${process.env.REACT_APP_WS_URI}`)
  const dispatch = useDispatch()
  const { data, error, status, isOn, time } = useSelector(({ ticker }) => ticker)

  useEffect(() => {
    if (isOn) {
      try {
        dispatch(pending())
        socket.emit('start', Number(time))
        socket.on('ticker', (response) => {
          const res = Array.isArray(response) ? response : [response]
          dispatch(fulfilled(res))
        })
      } catch (e) {
        socket.removeAllListeners()
        dispatch(rejected(e))
      }
    } else {
      socket.emit('end')
      dispatch(rejected('disconnect'))
    }
    return () => {
      socket.removeAllListeners()
      socket.close()
    }
  }, [isOn, time])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {(error || status === 'rejected') && <Error error={error} />}
      {data && status === 'resolved' && <CustomTable rows={data} />}
      <ControlPanel />
    </Suspense>
  )
}

export default Main
