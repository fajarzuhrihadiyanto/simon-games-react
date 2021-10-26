import { AspectRatio, Box, Grid, Image, Text } from '@chakra-ui/react'

const HowToGameVariants = ({ description, image }) => {
  return (
    <Grid templateColumns={['1fr', '1fr 2fr']} gap={12}>
      <Box>
        <AspectRatio ratio={4 / 3}>
          <Image src={image}/>
        </AspectRatio>
      </Box>
      <Box>
        <Text>{description}</Text>
      </Box>
    </Grid>
  )
}

export default HowToGameVariants
