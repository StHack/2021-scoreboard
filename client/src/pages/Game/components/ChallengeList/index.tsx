import React from 'react'
import { Box, Divider, Flex, Title } from '@mantine/core'
import { Challenge } from '../../../../models/Challenge'
import { ChallengeCard } from '../ChallengeCard'
import { useGame } from '../../../../hooks/useGame'
import { usePlayer } from '../../../../hooks/usePlayer'

interface ChallengeListProps {
  groups: Record<string, Challenge[]>
  handleClickChall: (c: Challenge) => void
}

const ChallengeList = ({ groups, handleClickChall }: ChallengeListProps) => {
  const {
    score: { challsScore: challScore },
  } = useGame()
  const { myTeamName } = usePlayer()
  return (
    <Box>
      {Object.entries(groups).map(([key, challs]) => (
        <Box key={key} mt="2.5rem" pb="xl" px="xl">
          <Title
            order={2}
            align="center"
            mb="sm"
            tt="capitalize"
            color="customPink.0"
          >
            {key}
          </Title>
          <Divider my="xl" color="customPink.0"></Divider>
          <Flex wrap="wrap" gap="lg" justify="center">
            {challs.map(c => (
              <ChallengeCard
                key={c.name}
                challenge={c}
                score={challScore[c.name]}
                currentTeam={myTeamName}
                onClick={() => handleClickChall(c)}
              />
            ))}
          </Flex>
        </Box>
      ))}
    </Box>
  )
}

export default ChallengeList
