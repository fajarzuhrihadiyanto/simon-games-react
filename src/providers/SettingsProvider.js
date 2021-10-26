import { createContext, useState } from 'react'

export const settingsContext = createContext(null)

const SettingsProvider = ({ children }) => {
  // Backsound music state (on/off)
  const [music, setMusic] = useState(false)

  // Sound FX state (on/off)
  const [soundFX, setSoundFX] = useState(true)

  // Piano sound state (on/off)
  const [beep, setBeep] = useState(true)

  // In game state (yes/no)
  const [inGameStatus, setInGame] = useState(false)

  return (
    <settingsContext.Provider value={{
      musicSetting: [music, setMusic],
      soundFXSetting: [soundFX, setSoundFX],
      beepSetting: [beep, setBeep],
      inGame: [inGameStatus, setInGame]
    }}>
      {children}
    </settingsContext.Provider>
  )
}

export default SettingsProvider
