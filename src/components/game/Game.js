import { useState, useContext } from 'react'

import { VStack } from '@chakra-ui/react'

import { settingsContext } from '../../providers/SettingsProvider'
import { difficulties, getRandomInteger } from '../../utilities'
import GameInfo from './GameInfo'
import GameOver from './GameOver'
import GameScreen from './GameScreen'

const Game = ({ gameModeIndex, difficultyIndex, setStep }) => {
  const difficulty = difficulties[difficultyIndex]

  const { inGame } = useContext(settingsContext)
  const setInGameStatus = inGame[1]

  const [ isGameOver, setIsGameOver ] = useState(false)

  const [ series, setSeries ] = useState([getRandomInteger(1, Math.pow(difficulty.col, 2))])
  const [ targetIndex, setTargetIndex ] = useState(0)

  const resetGame = () => {
    setInGameStatus(() => true)
    setIsGameOver(() => false)
    setSeries(() => [getRandomInteger(1, Math.pow(difficulty.col, 2))])
    setTargetIndex(() => 0)
  }

  return (
    <VStack w="full" maxW="md" spacing={4}>
      {isGameOver
        ? <GameOver
            resetGame={resetGame}
            setStep={setStep}
            score={series.length - 1}
            gameModeIndex={gameModeIndex}
            difficultyIndex={difficultyIndex}/>
        : (<>
            <GameScreen
              gameModeIndex={gameModeIndex}
              difficultyIndex={difficultyIndex}
              series={series}
              setSeries={setSeries}
              targetIndex={targetIndex}
              setTargetIndex={setTargetIndex}
              setIsGameOver={setIsGameOver}/>
            <GameInfo
              score={series.length - 1}
              gameModeIndex={gameModeIndex}
              difficultyIndex={difficultyIndex}/>
          </>)}
    </VStack>
  )
}

export default Game
