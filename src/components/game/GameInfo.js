import { useEffect, useState } from 'react'

import * as BSON from 'bson'
import * as Realm from 'realm-web'
import { Grid, Text } from '@chakra-ui/react'

import { difficulties, gameModes } from '../../utilities'

const app = Realm.App.getApp(process.env.REACT_APP_ID)

const GameInfo = ({ score, gameModeIndex, difficultyIndex }) => {
  // Get the game mode and difficulty
  const gameMode = gameModes[gameModeIndex]
  const difficulty = difficulties[difficultyIndex]

  const [maxScore, setMaxScore] = useState(0)

  const getMaxScore = async () => {
    try {
      const db = app.currentUser.mongoClient('mongodb-atlas').db(process.env.REACT_APP_DB_NAME)
      const games = db.collection('games')

      const result = (await games.aggregate([
        {
          $match: {
            game_mode_id: new BSON.ObjectID(gameMode.id),
            game_difficulty_id: new BSON.ObjectID(difficulty.id)
          }
        },
        {
          $group: {
            _id: null,
            max: {
              $max: "$score"
            }
          }
        }
      ]))[0]?.max || 0

      setMaxScore(result)
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    getMaxScore()
  }, [])

  return (
    <Grid templateColumns="repeat(2, 1fr)" fontSize="sm" rowGap={2} columnGap={4}>
      <Text align="right">Mode</Text>
      <Text align="left" fontWeight="bold">{gameMode.name}</Text>

      <Text align="right">Difficulty</Text>
      <Text align="left" fontWeight="bold">{difficulty.name}</Text>

      <Text align="right">Current Score</Text>
      <Text align="left" fontWeight="bold">{score}</Text>

      <Text align="right">Highest Score</Text>
      <Text align="left" fontWeight="bold">{maxScore}</Text>
    </Grid>
  )
}

export default GameInfo