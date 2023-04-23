import { Challenge } from 'models/Challenge'
import { Button, Flex, Group, Text } from '@mantine/core'

const GroupBy = ['Category', 'Difficulty', 'Author'] as const
export type GroupByType = typeof GroupBy[number]

type GroupBySelectorProps = {
  value: GroupByType
  onChange: (value: GroupByType) => void
}

export function GroupBySelector ({ value, onChange }: GroupBySelectorProps) {
  return (
    <Flex align="center">
      <Text>Group By : </Text>
      <Group ml="sm">
        {GroupBy.map(g => (
          <Button
            key={g}
            variant="outline"
            color="customPink.0"
            onClick={() => onChange(g)}
            disabled={value === g}
          >
            {g}
          </Button>
        ))}
      </Group>
    </Flex>
  )
}

export function getGroup (chall: Challenge, groupBy: GroupByType) {
  switch (groupBy) {
    case 'Author':
      return chall.author
    case 'Category':
      return chall.category
    case 'Difficulty':
      return chall.difficulty
    default:
      return 'unknown'
  }
}
