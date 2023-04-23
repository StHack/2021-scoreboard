import { Logo } from 'components/Icon'
import { TeamScore } from 'models/GameScore'
import { Box, Flex, Paper, Title } from '@mantine/core'
import { Achievement } from '../../../models/Achievement'
import {
  HeadData,
  RowData,
  TableSort,
} from '../../../components/TableSortFilter/TableSortFilter'

export type TeamsScoreBoardProps = {
  score: TeamScore[]
}

export function TeamsScoreBoard ({ score }: TeamsScoreBoardProps) {
  const headers: HeadData[] = [
    {
      key: 'rank',
      label: 'Rank',
      sortable: true,
    },
    {
      key: 'team',
      label: 'Team',
      sortable: true,
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
    },
    {
      key: 'breakthroughs',
      label: 'Breakthroughs',
      sortable: false,
    },
  ]

  const data: RowData[] = score.map(cs => {
    return {
      rank: cs.rank,
      team: cs.team,
      score: cs.score,
      breakthroughs: <BreakthroughsCell breakthroughs={cs.breakthroughs} />,
    }
  })

  return (
    <Paper
      shadow={'md'}
      radius={'lg'}
      mah={{ base: '30rem', md: '100%' }}
      p={{ base: 'sm', md: 'xl' }}
      sx={{ flexGrow: 1 }}
      bg="gray.0"
    >
      <Flex h="100%" direction="column">
        <Title order={2} color="customPink.0" align="center">
          Ranking
        </Title>
        <TableSort data={data} headers={headers} />
      </Flex>
    </Paper>
  )
}

const BreakthroughsCell = ({
  breakthroughs,
}: {
  breakthroughs: Achievement[]
}) => {
  return (
    <Flex>
      {breakthroughs.map(({ username, createdAt, challenge }, i) => (
        <Box
          key={i}
          title={`${username} - ${challenge} - ${createdAt.toLocaleTimeString(
            'fr',
          )}`}
        >
          <Logo size="1.5rem" />
        </Box>
      ))}
    </Flex>
  )
}
