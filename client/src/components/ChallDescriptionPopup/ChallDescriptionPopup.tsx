import { useChallengeSolveDelay } from 'hooks/useChallengeSolveDelay'
import { usePlayer } from 'hooks/usePlayer'
import { Challenge } from 'models/Challenge'
import { ChallengeScore } from 'models/GameScore'
import { Message } from 'models/Message'
import { Button, Flex, Modal } from '@mantine/core'
import ChallDescriptionPopupHeader from './ChallDescriptionPopupHeader'
import ChallDescriptionPopupMessages from './ChallDescriptionPopupMessagesProps'
import ChallDescriptionPopupSubmit from './ChallDescriptionPopupSubmit'
import ChallDescriptionPopupClues from './ChallDescriptionPopupClues'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'

export type ChallDescriptionPopupProps = {
  challenge: Challenge
  messages: Message[]
  readonly?: boolean
  score: ChallengeScore
  onClose: () => void
}

export function ChallDescriptionPopup ({
  challenge,
  score: { score, achievements },
  messages,
  readonly = false,
  onClose,
}: ChallDescriptionPopupProps) {
  const [modalOpened, { open, close }] = useDisclosure(false)
  const { name, author, category, description, difficulty } = challenge

  const { delayedTimer, openState } = useChallengeSolveDelay(
    challenge,
    achievements,
  )

  const { myTeamName } = usePlayer()
  // const myTeamSolved = achievements.find(a => a.teamname === myTeamName)
  const myTeamSolved = achievements.find(a => a.teamname === myTeamName)

  const latestAchievement = achievements[achievements.length - 1]

  const handleCloseModal = () => {
    close()
    onClose()
  }

  useEffect(() => {
    return () => {
      open()
    }
  }, [challenge, open])

  return (
    <Modal
      centered
      size="xl"
      withCloseButton={false}
      opened={modalOpened}
      onClose={handleCloseModal}
    >
      <Flex direction="column">
        <ChallDescriptionPopupHeader
          difficulty={difficulty}
          category={category}
          name={name}
          author={author}
          score={score}
        />
        <ChallDescriptionPopupMessages
          description={description}
          openState={openState}
          myTeamSolved={myTeamSolved}
          latestAchievement={latestAchievement}
          delayedTimer={delayedTimer}
        />
        <ChallDescriptionPopupSubmit
          myTeamSolved={myTeamSolved}
          openState={openState}
          readonly={readonly}
          name={name}
          onClose={onClose}
        />
        <ChallDescriptionPopupClues messages={messages} />
        <Flex justify="flex-end">
          <Button onClick={handleCloseModal}>Close</Button>
        </Flex>
      </Flex>
    </Modal>
  )
}
