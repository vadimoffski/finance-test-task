import React from 'react'
import PropTypes from 'prop-types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { cellsTitle, companies } from '../utils/constants'
import CustomCell from './CustomCell'
import { timeHandler } from '../utils/helpers'

const CustomTable = ({ rows }) => (
  <>
    <TableContainer component={Paper} style={{ marginTop: '40px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {cellsTitle.map((title) => (
              <TableCell key={title} align="center">
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map(({ change, change_percent, dividend, last_trade_time, price, ticker, yield: yield_1 }) => (
            <TableRow key={ticker} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
  </>
)

CustomTable.propTypes = {
  rows: PropTypes.shape({
    ticker: PropTypes.string,
    exchange: PropTypes.string,
    price: PropTypes.number,
    change: PropTypes.number,
    change_percent: PropTypes.number,
    dividend: PropTypes.number,
    yield: PropTypes.number,
    last_trade_time: PropTypes.string
  }).isRequired
}

export default CustomTable
