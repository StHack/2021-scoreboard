import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { ChallengeCard } from 'components/ChallengeCard'
import Popup from 'components/Popup'
import { ColumnDefinition, Table } from 'components/Table'
import { Achievement } from 'models/Achievement'
import { Challenge } from 'models/Challenge'
import { ChallengeScore } from 'models/GameScore'
import { useState } from 'react'
import { SpaceProps, space } from 'styled-system'

export type ChallsScoreBoardProps = {
  challsScore: Record<string, ChallengeScore>
  challenges: Challenge[]
}
export function ChallsScoreBoard ({
  challsScore,
  challenges,
}: ChallsScoreBoardProps) {
  const [selectedBreakthrough, setSelectedBreakthrough] =
    useState<Achievement>()

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" gap="2">
      {[...challenges]
        .sort(
          (c1, c2) => challsScore[c2.name].score - challsScore[c1.name].score,
        )
        .map(c => (
          <ChallengeCard
            key={c.name}
            challenge={c}
            score={challsScore[c.name]}
            currentTeam={challsScore[c.name].achievements[0]?.teamname}
            onClick={() =>
              setSelectedBreakthrough(challsScore[c.name].achievements[0])
            }
            size="6"
          />
        ))}
      {selectedBreakthrough && (
        <DetailChallPopup
          breakthrough={selectedBreakthrough}
          challScore={challsScore[selectedBreakthrough.challenge]}
          onClose={() => setSelectedBreakthrough(undefined)}
        />
      )}
    </Box>
  )
}

type DetailChallPopupProps = {
  breakthrough: Achievement
  challScore: ChallengeScore
  onClose: () => void
}
function DetailChallPopup ({
  breakthrough,
  challScore,
  onClose,
}: DetailChallPopupProps) {
  return (
    <Popup
      title={`${breakthrough.challenge} - ${challScore.score} pts`}
      onClose={onClose}
    >
      <Box as="h3" fontSize="3" textAlign="center" m="3">
        {`Breakthrough ${label(breakthrough)}`}
      </Box>
      <Table
        data={challScore.achievements}
        columns={columns}
        rowKey={row => row.teamname + row.username}
      />
    </Popup>
  )
}

const columns : ColumnDefinition<Achievement>[] = [
  { header: 'Time', rowValue: row => row.createdAt.toLocaleTimeString() },
  { header: 'Player', rowValue: row => row.username },
  { header: 'Team', rowValue: row => row.teamname },
]

const label = ({ username, teamname, createdAt }: Achievement) =>
  ` at ${createdAt.toLocaleTimeString()} by "${username}" of team "${teamname}"`
