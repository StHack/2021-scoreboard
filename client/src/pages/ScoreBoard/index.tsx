import { useGame } from 'hooks/useGame'
import { ChallsScoreBoard } from './components/ChallsScoreBoard'
import { TeamsScoreBoard } from './components/TeamsScoreBoard'
import { Box, Flex } from '@mantine/core'
import React from 'react'

export function ScoreBoard () {
  const {
    score: { challsScore, teamsScore },
    challenges,
  } = useGame()

  return (
    <Box h={{ base: '100%', md: 'calc(100vh - 70px)' }}>
      <Box w="100%" h="100%" p={{ base: 'sm', md: 'md' }}>
        <Flex h="100%" direction={{ base: 'column', md: 'row' }} gap="4rem">
          <TeamsScoreBoard score={teamsScore} />
          <ChallsScoreBoard score={challsScore} challenges={challenges} />
        </Flex>
      </Box>
    </Box>
  )
}
