import { Box, Grid, GridItem, Image, Skeleton, Text } from '@chakra-ui/react'

const HallOfFameList = ({ loading, list }) => {
  return (
    <Grid templateColumns="auto 1fr auto" w="full" maxW='2xl'>
      {!loading && list.length > 0 && list.map((rank, key) => (
        <>
          <GridItem p={4} borderBottom={'1px'}>
            {key === 0 && <Image src="/icons8-gold-medal-96.png" w={8}/>}
            {key === 1 && <Image src="/icons8-silver-medal-96.png" w={8}/>}
            {key === 2 && <Image src="/icons8-bronze-medal-96.png" w={8}/>}
            {key > 2 && <Text>{key + 1}</Text>}
          </GridItem>
          <GridItem p={4} borderBottom={'1px'}><Text align="left">{rank.username}</Text></GridItem>
          <GridItem p={4} borderBottom={'1px'}><Text>{rank.max_score}</Text></GridItem>
        </>
      ))}
      {loading && [...Array(5).keys()].map(() => (
        <>
          <Skeleton p={4} mt={1}>1</Skeleton>
          <Skeleton p={4} mt={1}>username</Skeleton>
          <Skeleton p={4} mt={1}>score</Skeleton>
        </>
      ))}
      {!loading && list.length === 0 && (
        <GridItem colSpan={3}>
          <Box>
            <Text fontWeight="bold">No Data</Text>
          </Box>
        </GridItem>
      )}
    </Grid>
  )
}

export default HallOfFameList