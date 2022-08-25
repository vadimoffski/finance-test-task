import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const Header = () => (
  <>
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Incode
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Typography variant="h6" noWrap sx={{ my: 2, color: 'inherit', display: 'block' }}>
              Finance
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </>
)

export default Header
