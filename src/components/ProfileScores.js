import { Grid, GridItem, Text, VStack } from '@chakra-ui/react'

const ProfileScores = ({ scores }) => {
  console.log(Object.keys(scores))
  return (
    <VStack spacing={2}>
      <Text fontWeight="bold">Highest Score</Text>
      <Grid
        templateColumns={['repeat(3, 1fr)', null, 'none']}
        templateRows={['none', null, 'repeat(3, auto)']}
        autoFlow={['row', null, 'column']}>
        {Object.keys(scores).map(mode => (
          <>
            <GridItem
              key={mode}
              colSpan={[1, null, 3]} rowSpan={[3, null, 1]} p={4}
              bgColor="gray.800" color="gray.50"
            >
              <Text my={'auto'}>{mode}</Text>
            </GridItem>

            {scores[mode] && Object.keys(scores[mode]).map((difficulty, index) => (
              <>
                <GridItem
                  key={mode + difficulty}
                  p={2}
                  borderLeft={['none', null, index === 0 ? '1px' : 'none']}
                  borderRight={['none', null, '1px']}
                  borderTop={[index === 0 ? '1px' : 'none', null, 'none']}
                  borderBottom={['1px', null, 'none']}>
                  <Text fontSize="md">{difficulty}</Text>
                </GridItem>
                <GridItem
                  key={mode + difficulty + index}
                  p={2}
                  borderLeft={index === 0 ? ['none', null, '1px'] : 'none'}
                  borderRight={['none', null, '1px']}
                  borderTop={[index === 0 ? '1px' : 'none', null, 'none']}
                  borderBottom={['1px', null, 'none']}>
                  <Text fontSize="md">{scores[mode][difficulty]}</Text>
                </GridItem>
              </>
            ))}
          </>
        ))}
      </Grid>
    </VStack>
  )
}

export default ProfileScores