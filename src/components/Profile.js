import { useContext, useEffect, useState } from 'react'

import * as Realm from 'realm-web'
import { Heading, IconButton, VStack } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'

import { audio } from '../utilities'
import { settingsContext } from '../providers/SettingsProvider'
import ProfileUsername from './ProfileUsername'
import ProfileScores from './ProfileScores'

const app = Realm.App.getApp(process.env.REACT_APP_ID)

const Profile = () => {
  const history = useHistory()

  // if user is not authenticated, go to index
  if (!app.currentUser || app.currentUser.providerType === 'anon-user') {
    history.push('/')
  }

  // Get sound fx state from the context
  const { soundFXSetting } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting

  const [ loading, setLoading ] = useState(true)
  const [ scores, setScores ] = useState(null)

  const backBtnHandler = () => soundFx && audio.menuClick.play()

  const getScores = async () => {
    const scores = await app.currentUser.functions.getScoreByUser(app.currentUser.id)
    if (scores) {
      setScores(() => scores)
      setLoading(() => false)
    }
  }

  useEffect(() => {
    // Only fetch scores if score is not available yet
    !scores && getScores()
  }, [])

  return (
    <VStack spacing={8}>
      <Heading>
        <Link to="/">
          <IconButton icon={<FaArrowLeft/>} rounded="full" onClick={backBtnHandler}/>
        </Link> Profile
      </Heading>
      {!loading && (
        <>
          <ProfileUsername username={scores?.username}/>
          <ProfileScores scores={scores?.data}/>
        </>
      )}
    </VStack>
  )
}

export default Profile