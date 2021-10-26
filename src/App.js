import React from 'react'

import '@fontsource/bungee-shade'
import '@fontsource/open-sans'
import * as Realm from 'realm-web'
import { Box, ChakraProvider, Grid } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import Main from './components/Main'
import Menu from './components/menu/Menu'
import SettingsProvider from './providers/SettingsProvider'
import theme from './theme'

const app = new Realm.App({ id: process.env.REACT_APP_ID })

const App = () => {

  // If no user, login anonymously
  !app.currentUser && app.logIn(Realm.Credentials.anonymous())

  return (
    <BrowserRouter>
      <SettingsProvider>
        <ChakraProvider theme={theme}>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <Menu justifySelf="flex-end"/>
              <Main/>
            </Grid>
          </Box>
        </ChakraProvider>
      </SettingsProvider>
    </BrowserRouter>
  )
}

export default App
