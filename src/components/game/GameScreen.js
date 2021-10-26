import { createRef, useContext, useEffect, useRef, useState } from 'react'

import { AspectRatio, Button, Grid } from '@chakra-ui/react'

import { settingsContext } from '../../providers/SettingsProvider'
import { audio, difficulties, gameModes, getRandomInteger } from '../../utilities'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const GameScreen = ({gameModeIndex, difficultyIndex, series, setSeries, setIsGameOver, targetIndex, setTargetIndex}) => {
  // Get audio settings from the context
  const { beepSetting, musicSetting, inGame } = useContext(settingsContext)
  const [ beep ] = beepSetting
  const [ music ] = musicSetting
  const setInGameStatus = inGame[1]

  // Get game mode and difficulty id
  const difficulty = difficulties[difficultyIndex]
  const gameMode = gameModes[gameModeIndex]

  // Configure buttons state and references
  const buttonInit = difficulty.buttons
  const buttonRefs = useRef([])
  buttonRefs.current = buttonInit.map((_, index) => buttonRefs.current[index] ?? createRef())
  const [buttons, setButtons] = useState(buttonInit)

  const addSeries = () => {
    setSeries(series => series.concat(getRandomInteger(1, Math.pow(difficulty.col, 2))))
  }

  // THE GAME RULE
  const btnClick = (e) => {
    // Get target button id and callback based on game mode
    const [targetButtonId, callback] =  gameMode.btnAction({
        numOfButtons: buttonInit.length,
        series,
        setButtons,
        targetIndex
      })

    // get the corresponding audio and play it
    const buttonId = Number(e.target.attributes['data-id'].value)
    const button = buttonInit.find(element => element.id === buttonId)
    const buttonAudio = new Audio(`/audio/${button.audio}`)
    buttonAudio.volume = 0.5
    beep && buttonAudio.play()

    // clicked button id must match the target button id
    if (buttonId === targetButtonId) {
      // if there is any next target, go to the next target
      let next = targetIndex + 1
      if (next === series.length) {
        // if not, add new button to the series
        // and set next target index to 0
        next = 0
        addSeries()
      }
      setTargetIndex(next)

      // invoke the callback function (if any)
      callback?.()
    } else {
      // if not, then game over
      music && audio.gameOver.play()
      setInGameStatus(() => false)
      setIsGameOver(() => true)
    }
  }

  // THE GAMEPLAY
  useEffect(() => {
    // Set all button to disable before start the series
    buttonRefs.current.map(button => button.current.disabled = true)

    // For all series ...
    series.reduce(async (prevProm, seri) => {
      // finish the previous job first (sleep)
      await prevProm

      // get the current button based on the series number
      const currentButton = buttonRefs?.current.find(button => Number(button.current?.attributes['data-id'].value) === seri)

      if (currentButton) {
        // Find the corresponding audio and play
        const button = buttonInit.find(element => element.id === seri)
        const audio = new Audio(`/audio/${button.audio}`)
        audio.volume = 0.5
        beep && audio.play()

        // Set the opacity to 0.3 for a sec, then turn it back
        currentButton.current.style.opacity = 0.3
        await sleep(1000)
        currentButton.current.style.opacity = 1
      }

      // return the new job to be finished next (sleep for 100 millisecond)
      return sleep(100)
    }, sleep(1000)).then(() => {
      buttonRefs.current.map(button => button.current && (button.current.disabled = false))
    })
  }, [beep, buttonInit, series])

  return (
    <Grid templateColumns={`repeat(${difficulty.col}, 1fr)`} gap={2} w="full" maxW="lg">
      {buttons.map((button, index) => (
        <AspectRatio key={index} ratio={1}>
          <Button
            onClick={btnClick}
            data-id={button.id}
            ref={buttonRefs.current[index]}
            bg={`${button.colorScheme}.500`}
            rounded="xl"
            _hover={{ bg: `${button.colorScheme}.600` }}
            _disabled={{ bg: `${button.colorScheme}.500`, cursor: 'not-allowed' }}/>
        </AspectRatio>
      ))}
    </Grid>
  )
}

export default GameScreen