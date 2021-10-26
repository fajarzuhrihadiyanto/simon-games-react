import { useContext } from 'react'

import { Grid, IconButton, Switch, Text, useDisclosure } from '@chakra-ui/react'
import { FaCog } from 'react-icons/fa'

import { settingsContext } from '../../providers/SettingsProvider'
import { audio } from '../../utilities'
import ModalWrapper from '../multiused/ModalWrapper'

const SettingsMenu = () => {
  // Get state from context
  const { musicSetting, soundFXSetting, beepSetting } = useContext(settingsContext)
  const [ music, setMusic ] = musicSetting
  const [ soundFX, setSoundFX ] = soundFXSetting
  const [ beep, setBeep ] = beepSetting

  // Modal setting
  const { isOpen, onOpen, onClose } = useDisclosure()
  const onModalClose = () => {
    soundFX && audio.menuClick.play()
    onClose()
  }

  // Menu click handler
  const menuClickHandler = () => {
    soundFX && audio.menuClick.play()
    onOpen()
  }

  // Setting switch handler
  const onSwitch = (stateSetter, state) => {
    soundFX && audio.menuClick.play()
    stateSetter(() => state)
  }
  const onMusicSwitch = () => onSwitch(setMusic, !music)
  const onSoundFxSwitch = () => onSwitch(setSoundFX, !soundFX)
  const onBeepSwitch = () => onSwitch(setBeep, !beep)

  return (
    <>
      <IconButton
        colorScheme="orange"
        rounded="full"
        size="md"
        fontSize="lg"
        icon={<FaCog/>}
        onClick={menuClickHandler}
      />
      <ModalWrapper
        size="sm"
        isOpen={isOpen}
        onClose={onModalClose}
        title="Settings">
        <Grid templateColumns="repeat(2, 1fr)" columnGap={4} rowGap={2} alignItems={'center'}>
          <Text align="right">Music</Text>
          <Switch isChecked={music} onChange={onMusicSwitch}/>

          <Text align="right">SoundFX</Text>
          <Switch isChecked={soundFX} onChange={onSoundFxSwitch}/>

          <Text align="right">Beep Sound</Text>
          <Switch isChecked={beep} onChange={onBeepSwitch}/>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default SettingsMenu
