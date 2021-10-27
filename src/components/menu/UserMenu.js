import { useState, useContext, useRef } from 'react'

import { IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import { FaUser } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import { app } from '../../providers/AppProvider'
import { settingsContext } from '../../providers/SettingsProvider'
import { audio } from '../../utilities'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'
import Alert from '../multiused/Alert'

const UserMenu = () => {
  const history = useHistory()

  // Logged in state for menu choice
  const [ isLoggedIn, setIsLoggedIn ] = useState(app.currentUser?.providerType === 'local-userpass')

  // Get sound fx and in game state from context
  const { soundFXSetting, inGame } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting
  const [ inGameStatus, setInGameStatus ] = inGame

  // Alert
  const [ isOpen, setIsOpen ] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  const alertConfirmHandler = () => {
    setInGameStatus(false)
    onClose()
    history.push('/profile')
  }

  // General menu item click handler which will be specified by the given callback provide by each menu item
  const menuClickHandler = (callback) => {
    soundFx && audio.menuClick.play()
    if (inGameStatus) {
      setIsOpen(true)
    } else {
      callback()
    }
  }

  // Modal setting for sign in and sign up
  const { isOpen: signInModalOpen, onOpen: signInModalOnOpen, onClose: signInModalOnClose } = useDisclosure()
  const { isOpen: signUpModalOpen, onOpen: signUpModalOnOpen, onClose: signUpModalOnClose } = useDisclosure()
  const onSignInModalOpen = () => {
    menuClickHandler(() => {
      signInModalOnOpen()
    })
  }
  const onSignUpModalOpen = () => {
    menuClickHandler(() => {
      signUpModalOnOpen()
    })
  }

  const menuParentClickHandler = () => soundFx && audio.menuClick.play()

  // Profile menu item click handler
  const profileClickHandler = () => menuClickHandler(() => history.push('/profile'))

  // Sign out menu item click handler
  const signOutHandler = async () => {
    menuClickHandler(async () => {
      await app.currentUser.logOut()
      setIsLoggedIn(false)
      history.push('/')
    })
  }

  return (
    <>
      <Menu>
        <MenuButton
          onClick={menuParentClickHandler}
          as={IconButton}
          rounded="full"
          colorScheme="orange"
          icon={<FaUser />}>
          Actions
        </MenuButton>
        <MenuList>
          {!isLoggedIn && (
            <>
              <MenuItem fontSize="md" onClick={onSignInModalOpen}>Sign In</MenuItem>
              <MenuItem fontSize="md" onClick={onSignUpModalOpen}>Sign Up</MenuItem>
            </>
          )}
          {isLoggedIn && (
            <>
              <MenuItem fontSize="md" onClick={profileClickHandler}>Profile</MenuItem>
              <MenuItem fontSize="md" onClick={signOutHandler}>Log Out</MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
      <SignInModal signInModalOpen={signInModalOpen} signInModalOnClose={signInModalOnClose} setIsLoggedIn={setIsLoggedIn}/>
      <SignUpModal signUpModalOpen={signUpModalOpen} signUpModalOnClose={signUpModalOnClose} setIsLoggedIn={setIsLoggedIn}/>
      <Alert
        title="Leave the game"
        text="Are you sure wanna leave the game ? your game will not be saved"
        buttonText="Leave"
        onConfirm={alertConfirmHandler}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}/>
    </>
  )
}

export default UserMenu