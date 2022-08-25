import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import './App.scss'
import Header from './container/Header'
import Main from './container/Main'

const App = () => (
  <>
    <CssBaseline />
    <Container maxWidth="lg" style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Main />
    </Container>
  </>
)

export default App
