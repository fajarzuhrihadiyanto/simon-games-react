import { useContext } from 'react'

import { Route, Switch } from 'react-router-dom'

import { settingsContext } from '../providers/SettingsProvider'
import { audio } from '../utilities'
import Index from './Index'
import Profile from './Profile'
import RequestResetPassword from './RequestResetPassword'
import ResetPassword from './ResetPassword'
import HallOfFame from './HallOfFame'

const Main = () => {
  const { musicSetting } = useContext(settingsContext)
  const [ music ] = musicSetting

  music ? audio.backsound.play() : audio.backsound.pause()

  return (
    <Switch>
      <Route path="/" exact component={Index}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/hall-of-fame" exact component={HallOfFame}/>
      <Route path="/forgot-password" exact component={RequestResetPassword}/>
      <Route path="/reset-password" exact component={ResetPassword}/>
    </Switch>
  )
}

export default Main