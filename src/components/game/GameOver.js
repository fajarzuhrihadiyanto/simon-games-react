import { useContext, useEffect } from 'react'

import * as BSON from 'bson'
import * as Realm from 'realm-web'
import { Button, Heading, Text } from '@chakra-ui/react'

import { settingsContext } from '../../providers/SettingsProvider'
import { audio, difficulties, gameModes } from '../../utilities'

const app = Realm.App.getApp(process.env.REACT_APP_ID)

const GameOver = ({resetGame, setStep, gameModeIndex, difficultyIndex, score}) => {
  // Get sound fx state from context
  const { soundFXSetting } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting

  // Get game mode and difficulty id
  const gameModeId = gameModes[gameModeIndex].id
  const difficultyId = difficulties[difficultyIndex].id

  const restartBtnClickHandler = () => {
    soundFx && audio.menuClick.play()
    resetGame()
  }

  const menuBtnClickHandler = () => {
    soundFx && audio.menuClick.play()
    setStep(0)
  }

  useEffect(() => {
    const insertGame = async () => {
      try {
        const db = app.currentUser.mongoClient("mongodb-atlas").db(process.env.REACT_APP_DB_NAME)
        const games = db.collection('games')

        await games.insertOne({
          user_id: app.currentUser.id,
          game_mode_id: new BSON.ObjectID(gameModeId),
          game_difficulty_id: new BSON.ObjectID(difficultyId),
          score: score,
          created_date: new Date()
        })
      } catch (err) {
        alert(err)
      }
    }

    // Only insert game record if user is authenticated (not anonymous)
    app.currentUser.providerType === 'local-userpass' && insertGame()
  }, [difficultyId, gameModeId, score])
  return (
    <>
      <Heading>Game Over</Heading>
      <Text>Your score is {score}</Text>
      <Button onClick={restartBtnClickHandler} colorScheme="orange" rounded="full" w="xs">Restart</Button>
      <Button onClick={menuBtnClickHandler} rounded="full" w="xs">Main Menu</Button>
    </>
  )
}

export default GameOver