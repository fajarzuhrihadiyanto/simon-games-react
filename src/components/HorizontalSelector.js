import { useContext } from 'react'

import { Box, IconButton, Input } from '@chakra-ui/react'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

import { settingsContext } from '../providers/SettingsProvider'
import { audio } from '../utilities'

const HorizontalSelector = ({ list, selectedIndex, setSelectedIndex }) => {
  const { soundFXSetting } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting

  const goToBefore = () => {
    soundFx && audio.menuClick.play()
    if (selectedIndex === 0) {
      setSelectedIndex(() => list.length - 1)
    } else {
      setSelectedIndex(() => selectedIndex - 1)
    }
  }

  const goToAfter = () => {
    soundFx && audio.menuClick.play()
    if (selectedIndex === list.length - 1) {
      setSelectedIndex(() => 0)
    } else {
      setSelectedIndex(() => selectedIndex + 1)
    }
  }

  return (
    <Box position="relative">
      <IconButton
        onClick={goToBefore}
        icon={<FaChevronCircleLeft/>}
        position="absolute"
        rounded="full"
        zIndex={10}
        bg="transparent"
        _hover={{ bg: 'transparent' }}/>
      <Input
        type="text"
        readOnly={true}
        value={list[selectedIndex].name}
        w="3xs"
        bg="transparent"
        border="1px"
        rounded="full"
        textAlign="center"/>
      <IconButton
        onClick={goToAfter}
        icon={<FaChevronCircleRight/>}
        position="absolute"
        right={0}
        rounded="full"
        zIndex={10}
        bg="transparent"
        _hover={{ bg: 'transparent' }}/>
    </Box>
  )
}

export default HorizontalSelector
