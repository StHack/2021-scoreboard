import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { Logo } from 'components/Icon'
import { TeamScore } from 'models/GameScore'
import { space, SpaceProps } from 'styled-system'

export type TeamsScoreBoardProps = {
  score: TeamScore[]
}

export function TeamsScoreBoard ({ score }: TeamsScoreBoardProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Score</th>
          <th>Breakthrough</th>
        </tr>
      </thead>
      {score.map(cs => (
        <tr key={cs.team}>
          <td>{cs.rank}</td>
          <td>{cs.team}</td>
          <td>{cs.score}</td>
          <Box as="td" display="flex">
            {cs.breakthroughs.map(({ username, createdAt, challenge }, i) => (
              <Box
                key={i}
                title={`${username} - ${challenge} - ${createdAt.toLocaleTimeString(
                  'fr',
                )}`}
              >
                <Logo size="2" />
              </Box>
            ))}
          </Box>
        </tr>
      ))}
    </Table>
  )
}

const Table = styled.table<SpaceProps>`
  border-collapse: collapse;
  border-radius: 5px;

  ${space}
  thead tr {
    background-color: transparent !important;
  }

  thead th:first-child {
    border-top-left-radius: 8px;
  }

  thead th:last-child {
    border-top-right-radius: 8px;
  }

  th {
    background-color: rgb(235, 235, 235);
    height: 30px;
    line-height: 30px;
    font-weight: ${p => p.theme.fontWeights[1]};
    font-size: ${p => p.theme.fontSizes[0]};
  }

  td {
    text-align: center;
  }

  tr:nth-of-type(even) {
    background-color: rgb(250, 250, 250);
  }

  tr:nth-of-type(odd) {
    background-color: rgb(245, 245, 245);
  }
`
