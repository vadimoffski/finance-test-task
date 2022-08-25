import React from 'react'
import { FormHelperText } from '@mui/material'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useDispatch, useSelector } from 'react-redux'
import { switcher, timeHandler } from '../redux/app/tickerSlice'

const ControlPanel = () => {
  const { isOn, time } = useSelector(({ ticker }) => ticker)
  const dispatch = useDispatch()
  return (
    <>
      <Box>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Interval</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={time}
              onChange={(event) => dispatch(timeHandler(event.target.value))}
              label="Age"
            >
              <MenuItem value={3000}>3s</MenuItem>
              <MenuItem value={5000}>5s</MenuItem>
              <MenuItem value={7000}>7s</MenuItem>
            </Select>
            <FormHelperText>Interval time</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label" />
            <Select
              value={isOn}
              onChange={(event) => dispatch(switcher(event.target.value))}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value>On</MenuItem>
              <MenuItem value={false}>Off</MenuItem>
            </Select>
            <FormHelperText>on/off tickers</FormHelperText>
          </FormControl>
        </div>
      </Box>
    </>
  )
}

export default ControlPanel
