import React, { useEffect, useState } from 'react'
import { Box, Flex, Paper, Space, Title } from '@mantine/core'
import { getGroup, GroupBySelector, GroupByType } from '../GroupBySelector'
import { Challenge } from '../../../../models/Challenge'
import { useGame } from '../../../../hooks/useGame'
import { usePlayer } from '../../../../hooks/usePlayer'
import ChallengeList from '../ChallengeList'
import { ChallDescriptionPopup } from '../../../../components/ChallDescriptionPopup/ChallDescriptionPopup'

const GameContent = () => {
  const {
    challenges,
    score: { challsScore: challScore },
    messages,
  } = useGame()

  const { myScore, myTeamScore } = usePlayer()

  const [groupBy, setGroupBy] = useState<GroupByType>('Category')
  const groups = challenges.reduce<Record<string, Challenge[]>>(
    (acc, chall) => ({
      ...acc,
      [getGroup(chall, groupBy)]: [
        ...(acc[getGroup(chall, groupBy)] ?? []),
        chall,
      ],
    }),
    {},
  )
  const [selectedChall, setSelectedChall] = useState<Challenge>()

  useEffect(() => {
    setSelectedChall(undefined)
  }, [challenges])
  const handleOpenModal = (challenge: Challenge) => {
    setSelectedChall(challenge)
  }

  return (
    <Box sx={() => ({ flexGrow: 1 })} p="md">
      <Paper p="xl" radius="lg" bg="gray.0">
        <Flex px="xs" justify="space-around">
          <Title order={2}>Your Score: {myScore}</Title>
          <Title order={2}>Team Score: {myTeamScore}</Title>
        </Flex>
        <Space h="xl" />
        <Space h="xl" />
        <Title color="customPink.0">Challenges</Title>
        <Space h="xl" />
        <GroupBySelector value={groupBy} onChange={setGroupBy} />
        <ChallengeList
          groups={groups}
          handleClickChall={c => handleOpenModal(c)}
        />
      </Paper>
      {selectedChall && (
        <ChallDescriptionPopup
          challenge={selectedChall}
          score={challScore[selectedChall.name]}
          messages={messages.filter(m => m.challenge === selectedChall.name)}
          onClose={() => setSelectedChall(undefined)}
        />
      )}
    </Box>
  )
}

export default GameContent
