import { Challenge } from 'models/Challenge'
import { ChallengeScore } from 'models/GameScore'
import { Flex, Paper, Title } from '@mantine/core'
import {
  HeadData,
  RowData,
  TableSort,
} from '../../../components/TableSortFilter/TableSortFilter'

export type ChallsScoreBoardProps = {
  score: Record<string, ChallengeScore>
  challenges: Challenge[]
}

export function ChallsScoreBoard ({ score, challenges }: ChallsScoreBoardProps) {
  const headers: HeadData[] = [
    { key: 'name', sortable: true, label: 'Challs' },
    { key: 'score', sortable: true, label: 'Score' },
  ]

  const data: RowData[] = challenges.map(c => {
    return {
      name: c.name,
      score: score[c.name].score,
    }
  })

  return (
    <Paper
      shadow={'md'}
      radius={'lg'}
      p={{ base: 'sm', md: 'xl' }}
      mah={{ base: '30rem', md: '100%' }}
      sx={{ flexShrink: 0 }}
      bg="gray.0"
    >
      <Flex h="100%" direction="column" maw="20rem">
        <Title order={2} color="customPink.0" align="center">
          Challs score
        </Title>
        <TableSort headers={headers} data={data} filterable={false} />
      </Flex>
    </Paper>
  )
}
