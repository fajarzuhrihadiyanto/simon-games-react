import { ButtonGroup } from '@chakra-ui/react'

import HowToPlayMenu from './HowToPlayMenu'
import SettingsMenu from './SettingsMenu'
import HallOfFameMenu from './HallOfFameMenu'
import UserMenu from './UserMenu'

const Menu = props => {
  return (
    <ButtonGroup
      variant="outline"
      {...props}>
      <HallOfFameMenu/>
      <SettingsMenu/>
      <HowToPlayMenu/>
      <UserMenu/>
    </ButtonGroup>
  )
}

export default Menu
