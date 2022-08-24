import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Error = () => {
  return (
    <>
      <Box component="span" sx={{ p: 2, border: '1px dashed grey' }} style={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" component="h2">
          Sorry, something went wrong. Please, visit site later.
        </Typography>
      </Box>
    </>
  )
}

export default Error