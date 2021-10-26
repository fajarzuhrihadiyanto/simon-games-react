import { useContext, useEffect, useState } from 'react'

import * as Realm from 'realm-web'
import { Heading, IconButton, VStack } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { settingsContext } from '../providers/SettingsProvider'
import { audio } from '../utilities'
import HallOfFameFilter from './HallOfFameFilter'
import HallOfFameList from './HallOfFameList'

const app = Realm.App.getApp(process.env.REACT_APP_ID)

const HallOfFame = () => {
  // Get sound fx state from the context
  const { soundFXSetting } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting

  // Filter state
  const [ modeFilter, setModeFilter ] = useState('61667ae2a2a7d3b153d4a4bf')
  const [ diffFilter, setDiffFilter ] = useState('61667a82a2a7d3b153d4a4bc')
  const [ timeRangeFilter, setTimeRangeFilter ] = useState(1)

  const [ loading, setLoading ] = useState(true)
  const [ list, setList ] = useState([])

  const backBtnClickHandler = () => soundFx && audio.menuClick.play()

  // Filter change handler
  const modeChangeHandler = (e) => setModeFilter(() => e.target.value)
  const diffChangeHandler = (e) => setDiffFilter(() => e.target.value)
  const timeChangeHandler = (e) => setTimeRangeFilter(() => e.target.value)

  const getList = async () => {
    try {
      setLoading(() => true)
      const list = await app.currentUser.functions.getScoreByModeDiff({
        game_mode_id: modeFilter,
        game_difficulty_id: diffFilter,
        time_range: timeRangeFilter})
      if (list) {
        setList(list)
      }
    } catch (err) {
      alert(err)
      setList([])
    } finally {
      setLoading(() => false)
    }
  }

  useEffect(() => {
    getList()
  }, [modeFilter, diffFilter, timeRangeFilter])

  return (
    <VStack spacing={8}>
      <Heading>
        <Link to="/">
          <IconButton icon={<FaArrowLeft/>} rounded="full" onClick={backBtnClickHandler}/>
        </Link> hall of fame
      </Heading>
      <HallOfFameFilter
        modeChangeHandler={modeChangeHandler}
        diffChangeHandler={diffChangeHandler}
        timeChangeHandler={timeChangeHandler}/>
      <HallOfFameList
        list={list}
        loading={loading}/>
    </VStack>
  )
}

export default HallOfFame