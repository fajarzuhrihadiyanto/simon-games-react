import { useContext, useRef, useState } from 'react'

import { IconButton } from '@chakra-ui/react'
import { FaTrophy } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import { settingsContext } from '../../providers/SettingsProvider'
import { audio } from '../../utilities'
import Alert from '../multiused/Alert'

const HallOfFameMenu = () => {
  const history = useHistory()

  // Get sound fx and in game state from context
  const { soundFXSetting, inGame } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting
  const [ inGameStatus, setInGameStatus ] = inGame

  // Configure state for alert
  const [ isOpen, setIsOpen ] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  // Set on alert confirm
  const alertConfirmHandler = () => {
    setInGameStatus(false)
    onClose()
    history.push('/hall-of-fame')
  }

  // On menu click
  const btnClickHandler = () => {
    soundFx && audio.menuClick.play()
    if (inGameStatus) {
      setIsOpen(true)
    } else {
      history.push('/hall-of-fame')
    }
  }

  return (
    <>
      <IconButton
        onClick={btnClickHandler}
        colorScheme="orange"
        rounded="full"
        size="md"
        fontSize="lg"
        icon={<FaTrophy/>}
        />
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

export default HallOfFameMenu
