import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import TableCell from '@mui/material/TableCell'
import { makeStyles } from '@mui/styles'
import { isTrend } from '../utils/helpers'

const useStyles = makeStyles({
  increment: {
    backgroundColor: 'green',
    width: '50px',
    color: 'white'
  },
  decrement: {
    backgroundColor: 'red',
    width: '50px',
    color: 'white'
  }
})

const CustomCell = ({ title, ...props }) => {
  const classes = useStyles()
  const prev = useRef(null)

  return (
    <>
      <TableCell
        className={`${isTrend(prev?.current?.innerText, title) ? classes.increment : classes.decrement}`}
        ref={prev}
        {...props}
      >
        {`${title} ${isTrend(prev?.current?.innerText, title) ? '↑' : '↓'}`}
      </TableCell>
    </>
  )
}

CustomCell.propTypes = {
  title: PropTypes.string.isRequired
}

export default React.memo(CustomCell)
