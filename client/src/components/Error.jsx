import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Error = ({ error }) => (
  <>
    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }} style={{ marginTop: '20px', textAlign: 'center' }}>
      <Typography sx={{ fontSize: 24 }} color="text.secondary" component="h2">
        {`Sorry, ${error}.`}
      </Typography>
    </Box>
  </>
)

Error.propTypes = {
  error: PropTypes.string
}

Error.defaultProps = {
  error: 'something went wrong'
}

export default Error
