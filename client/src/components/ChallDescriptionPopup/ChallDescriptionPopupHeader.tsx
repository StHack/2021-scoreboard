import { Flex, Text, Title } from '@mantine/core'

interface ChallDescriptionPopupHeaderProps {
  name: string
  author: string
  category: string
  difficulty: string
  score: number
}

const ChallDescriptionPopupHeader = ({
  name,
  author,
  category,
  difficulty,
  score,
}: ChallDescriptionPopupHeaderProps) => {
  return (
    <Flex justify="space-between">
      <Flex direction="column">
        <Title order={1} color="customPink.0">
          {name}
        </Title>
        <Text fs="italic"> by {author}</Text>
        <Text>
          {category} - {difficulty}
        </Text>
      </Flex>
      <Title order={2} pt="9px">
        Score: {score}
      </Title>
    </Flex>
  )
}

export default ChallDescriptionPopupHeader
