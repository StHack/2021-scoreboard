import styled from '@emotion/styled'
import { Challenge } from 'models/Challenge'
import { ChallengeScore } from 'models/GameScore'
import { space, SpaceProps } from 'styled-system'

export type ChallsScoreBoardProps = {
  score: Record<string, ChallengeScore>
  challenges: Challenge[]
}

export function ChallsScoreBoard ({ score, challenges }: ChallsScoreBoardProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Challs</th>
          <th>Score</th>
        </tr>
      </thead>
      {challenges.map(c => (
        <tr key={c.name}>
          <td>{c.name}</td>
          <td>{score[c.name].score}</td>
        </tr>
      ))}
    </Table>
  )
}

const Table = styled.table<SpaceProps>`
  border-collapse: collapse;
  border-radius: 5px;
  box-shadow: ${p => p.theme.shadows.small};

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
