import { ChallState } from '../../hooks/useChallengeSolveDelay'
import { Achievement } from '../../models/Achievement'
import { Space, Text, Title } from '@mantine/core'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownRenderers } from '../../styles/react-markdown'
import React, { PropsWithChildren } from 'react'

interface ChallengeDescriptionPopupMessagesProps {
  description: string
  openState: ChallState
  myTeamSolved: Achievement | undefined
  latestAchievement: Achievement
  delayedTimer: string | undefined
}

const ChallDescriptionPopupMessages = ({
  description,
  openState,
  myTeamSolved,
  latestAchievement,
  delayedTimer,
}: ChallengeDescriptionPopupMessagesProps) => {
  return (
    <>
      <Space h="xl" />
      {openState !== 'broken' && (
        <>
          <ChallDescriptionPopupMessage title="Description">
            <ReactMarkdown
              components={ReactMarkdownRenderers}
              children={description}
            />
          </ChallDescriptionPopupMessage>
        </>
      )}
      {openState === 'broken' && (
        <>
          <ChallDescriptionPopupMessage title="Oops ...">
            This challenge is currently considered as broken and cannot be
            completed right now.
          </ChallDescriptionPopupMessage>
        </>
      )}
      {myTeamSolved && (
        <>
          <Space h="xl" />
          <ChallDescriptionPopupMessage title="Congratulations !">
            {myTeamSolved.username} has already solved this chall !
          </ChallDescriptionPopupMessage>
        </>
      )}
      {openState === 'delayed' && latestAchievement && !myTeamSolved && (
        <>
          <Space h="xl" />
          <ChallDescriptionPopupMessage
            title={`Team "${latestAchievement.teamname}" just solved this challenge`}
          >
            You need to wait {delayedTimer} before being able to submit your
            flag
          </ChallDescriptionPopupMessage>
        </>
      )}
    </>
  )
}

interface ChallengeDescriptionPopupMessageProps {
  title: string
}

const ChallDescriptionPopupMessage = ({
  title,
  children,
}: PropsWithChildren<ChallengeDescriptionPopupMessageProps>) => {
  return (
    <>
      <Title order={3} color="customPink.0">
        {title}
      </Title>
      <Text my="2">{children}</Text>
    </>
  )
}

export default ChallDescriptionPopupMessages
