import { useContext } from 'react'

import { Button, VStack } from '@chakra-ui/react'

import { settingsContext } from '../providers/SettingsProvider'
import { gameModes, difficulties, audio } from '../utilities'
import HorizontalSelector from './HorizontalSelector'

const ModeDifficultySelector = ({ setStep, gameMode, difficulty }) => {
  const [ gameModeIndex, setGameModeIndex ] = gameMode
  const [ difficultyIndex, setDifficultyIndex ] = difficulty

  const { soundFXSetting, inGame } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting
  const [ _, setInGameStatus ] = inGame

  const startBtnHandler = () => {
    soundFx && audio.menuClick.play()
    setInGameStatus(() => true)
    setStep(2)
  }

  const menuBtnHandler = () => {
    soundFx && audio.menuClick.play()
    setStep(0)
  }

  return (
    <VStack spacing={4}>
      <HorizontalSelector list={gameModes} selectedIndex={gameModeIndex} setSelectedIndex={setGameModeIndex}/>
      <HorizontalSelector list={difficulties} selectedIndex={difficultyIndex} setSelectedIndex={setDifficultyIndex}/>
      <Button onClick={startBtnHandler} colorScheme="orange" rounded="full" w="3xs">Start Game</Button>
      <Button onClick={menuBtnHandler} rounded="full" w="3xs">Main Menu</Button>
    </VStack>
  )
}
export default ModeDifficultySelector
