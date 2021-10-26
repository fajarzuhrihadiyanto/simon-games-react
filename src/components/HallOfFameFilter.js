import { HStack, Select } from '@chakra-ui/react'
import { FaChevronCircleDown } from 'react-icons/fa'

import { difficulties, gameModes } from '../utilities'

const HallOfFameFilter = ({modeChangeHandler, diffChangeHandler, timeChangeHandler}) => {
  return (
    <HStack>
      <Select rounded="full" icon={<FaChevronCircleDown/>} minW={'max-content'} onChange={modeChangeHandler}>
        {gameModes.map((mode, index) => (
          <option key={index} value={mode.id}>{mode.name}</option>
        ))}
      </Select>
      <Select rounded="full" icon={<FaChevronCircleDown/>} minW={'max-content'} onChange={diffChangeHandler}>
        {difficulties.map((difficulty, index) => (
          <option key={index} value={difficulty.id}>{difficulty.name}</option>
        ))}
      </Select>
      <Select rounded="full" icon={<FaChevronCircleDown/>} minW={'max-content'} onChange={timeChangeHandler}>
        <option value="1">All Time</option>
        <option value="2">This Month</option>
      </Select>
    </HStack>
  )
}

export default HallOfFameFilter