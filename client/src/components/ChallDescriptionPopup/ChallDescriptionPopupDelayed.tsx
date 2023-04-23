import React from 'react'
import { ChallState } from '../../hooks/useChallengeSolveDelay'
import { Achievement } from '../../models/Achievement'
import { Text } from '@mantine/core'

interface ChallDescriptionPopupDelayedProps {
  openState: ChallState
  latestAchievement: Achievement
  delayedTimer: string | undefined
}

const ChallDescriptionPopupDelayed = ({
  openState,
  latestAchievement,
  delayedTimer,
}: ChallDescriptionPopupDelayedProps) => {
  return (
    <>
      {openState === 'delayed' && latestAchievement && (
        <Text my="2">
          Team "{latestAchievement.teamname}" just solved this challenge, you
          need to wait {delayedTimer} before being able to submit your flag
        </Text>
      )}
    </>
  )
}

export default ChallDescriptionPopupDelayed
