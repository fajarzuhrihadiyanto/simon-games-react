import { useState, useContext } from 'react'

import { Button, Heading, VStack } from '@chakra-ui/react'

import { settingsContext } from '../providers/SettingsProvider'
import { audio } from '../utilities'
import Game from './game/Game'
import ModeDifficultySelector from './ModeDifficultySelector'

const Index = () => {
  const [ step, setStep ] = useState(0)

  const [ gameModeIndex, setGameModeIndex ] = useState(0)
  const [ difficultyIndex, setDifficultyIndex ] = useState(0)

  // Get sound fx state from the context
  const { soundFXSetting } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting

  const playBtnClickHandler = () => {
    soundFx && audio.menuClick.play()
    setStep(() => 1)
  }

  return (
    <VStack spacing={8}>
      {step === 0 && (
        <>
          <Heading>simon games</Heading>
          <Button onClick={playBtnClickHandler} variant="solid" colorScheme="orange" rounded="full" w="3xs">Play</Button>
        </>
      )}
      {step === 1 && (
        <>
          <Heading>simon games</Heading>
          <ModeDifficultySelector
            setStep={setStep}
            gameMode={[gameModeIndex, setGameModeIndex]}
            difficulty={[difficultyIndex, setDifficultyIndex]}/>
        </>
      )}
      {step === 2 && <Game gameModeIndex={gameModeIndex} difficultyIndex={difficultyIndex} setStep={setStep} />}
    </VStack>
  )
}

export default Index
