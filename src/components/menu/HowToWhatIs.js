import { Box, Text } from '@chakra-ui/react'

const HowToWhatIs = () => {
  return (
    <Box>
      <Text align="justify" mt={4}>
        Simon games is an electronic game invented by Ralph H. Baer and Howard J. Morrison programmed by Lenny Cope.
        This game can simply played by matching a random series of tones and blinked light that appear on a bunch of
        colored button. Every time we can match the series, it will add one new random tones and blinked light to
        the series, so the game will getting longer and harder.
      </Text>
      <Text align="justify" mt={2}>
        This game is useful to improve our memory skills by memorizing the series of blinked button. Simon games also
        practice our concentration and patient, especially when we have reached dozens of series. To make the game more
        exciting, I create some variation to the game, such as game modes and difficulties by the number of buttons.
      </Text>
    </Box>
  )
}

export default HowToWhatIs
