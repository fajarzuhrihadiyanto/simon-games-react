import { useContext, useState } from 'react';

import { IconButton, ModalFooter, Text, useDisclosure } from '@chakra-ui/react'
import { FaQuestion, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { audio} from '../../utilities'
import { settingsContext } from '../../providers/SettingsProvider';
import HowToGameVariants from './HowToGameVariants';
import HowToWhatIs from './HowToWhatIs';
import ModalWrapper from '../multiused/ModalWrapper';
import Credits from './Credits';

const howToContents = [
  {
    title: 'What is Simon Games ?',
    content: <HowToWhatIs/>
  },
  {
    title: 'Classic Mode',
    content: <HowToGameVariants
      description={`
        Classic mode is the original version of simon games, where we have to
        match the exact series of tones and blinked button. In every round, a
        bunch of buttons will be blinked for a second sequentially. After the
        last button blinked, we have to recreate the tones by click on the same
        button sequentially to go to the next round. Every round, a new blinked 
        button will be added to the series.
      `}
      image="/simon-games-classic.gif"
    />
  },
  {
    title: 'Reverse Mode',
    content: <HowToGameVariants
      description={`
        Reverse mode is a new variation of simon games, where we have to recreate
        the tones in the reverse order of the original series. In other words,
        the last blinked button must be clicked first, and continue until the
        first blinked light which must be clicked at last.
      `}
      image="/simon-games-reverse.gif"
    />
  },
  {
    title: 'Mirror Mode',
    content: <HowToGameVariants
      description={`
        Mirror mode is a new variation of simon games, where for each blinked
        button, we have to click the button that placed in the mirror position
        of the original one. If the blinked button is in the southwest position,
        we have to click the button in the northeast position, and vice versa.
      `}
      image="/simon-games-mirror.gif"
    />
  },
  {
    title: 'Randomize Mode',
    content: <HowToGameVariants
      description={`
        Randomize mode is a new variation of simon games, where for each button
        we clicked, the order of a button will be shuffled. The goal here is to
        match the button order based on the color and tones, so pay attention to
        the color order, not just the position pattern.
      `}
      image="/simon-games-randomize.gif"
    />
  },
  {
    title: 'Difficulties',
    content: <HowToGameVariants
      description={`
        Besides game mode, this game is also have difficulty variation based on
        the number of buttons. Easy mode have 4 buttons with 2 columns and 2 rows
        which is same as the original game. Hard mode have 9 buttons with 3 columns
        and 3 rows. Extreme mode have 16 buttons with 4 columns and 4 rows.
      `}
      image="/simon-games-difficulties.gif"
    />
  },
  {
    title: 'Credits',
    content: <Credits/>
  }
]

const HowToPlayMenu = () => {
  // Sound fx state from context
  const { soundFXSetting } = useContext(settingsContext)
  const [ soundFx ] = soundFXSetting

  // Modal setting
  const { isOpen, onOpen, onClose } = useDisclosure()
  const onModalClose = () => {
    soundFx && audio.menuClick.play()
    onClose()
  }

  const [ howToIndex, setHowToIndex ] = useState(0)

  // Menu click handler
  const menuClickHandler = () => {
    soundFx && audio.menuClick.play()
    onOpen()
  }

  // Previous button handler
  const goPrevHandler = () => {
    soundFx && audio.menuClick.play()
    setHowToIndex(() => howToIndex - 1)
  }

  // Next button handler
  const goNextHandler = () => {
    soundFx && audio.menuClick.play()
    setHowToIndex(() => howToIndex + 1)
  }

  return (
    <>
      <IconButton
        colorScheme="orange"
        rounded="full"
        size="md"
        fontSize="lg"
        icon={<FaQuestion/>}
        onClick={menuClickHandler}
      />
      <ModalWrapper
        size="4xl"
        isOpen={isOpen}
        onClose={onModalClose}
        title={howToContents[howToIndex]?.title}
        Footer={(
          <ModalFooter justifyContent="space-between">
            <IconButton
              icon={<FaArrowLeft/>}
              isDisabled={howToIndex === 0}
              rounded="full"
              onClick={goPrevHandler}
            />
            <Text>{howToIndex + 1} / {howToContents.length}</Text>
            <IconButton
              icon={<FaArrowRight/>}
              isDisabled={howToIndex === howToContents.length - 1}
              rounded="full"
              onClick={goNextHandler}
            />
          </ModalFooter>
        )}>
        {howToContents[howToIndex]?.content}
      </ModalWrapper>
    </>
  )
}

export default HowToPlayMenu