import styled from '@emotion/styled'
import { CategoryImg } from 'components/CategoryImg'
import {
  ChallState,
  useChallengeSolveDelay,
} from 'hooks/useChallengeSolveDelay'
import { Challenge } from 'models/Challenge'
import { ChallengeScore } from 'models/GameScore'
import BrokenImg from './broken.png'
import ClosedImg from './closed.png'
import DelayedImg from './delayed.png'
import { Card, Image, Title } from '@mantine/core'

type ChallengeCardProps = {
  challenge: Challenge
  score: ChallengeScore
  currentTeam?: string
  onClick: () => void
}

interface StyledCardProps {
  state: ChallState
  score: number
  checked: boolean
  delayed?: string
}

export function ChallengeCard ({
  challenge,
  currentTeam,
  score: { score, achievements },
  onClick,
}: ChallengeCardProps) {
  const { name, img, category } = challenge
  const { openState, delayedTimer } = useChallengeSolveDelay(
    challenge,
    achievements,
  )

  return (
    <StyledCard
      state={openState}
      delayed={delayedTimer}
      score={score}
      checked={achievements.some(a => a.teamname === currentTeam)}
      shadow="sm"
      padding="xs"
      radius="md"
      maw="12rem"
      mah="14rem"
      withBorder
      onClick={onClick}
    >
      <Card.Section>
        {img && <Image src={img} alt={name} title={name} fit="contain" />}
        {!img && <CategoryImg category={category} />}
      </Card.Section>
      <Title order={4} ta="center" mb="xs" color="customPink.0">
        {name}
      </Title>
    </StyledCard>
  )
}

const StyledCard = styled(Card as any)<StyledCardProps>`
  position: relative;
  cursor: pointer;

  ::before {
    content: '${p => (p.checked ? `✔ ${p.score}` : p.score)}';
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.2rem 0.6rem;
    border-bottom-left-radius: 1rem;
    background: ${p =>
      p.checked ? p.theme.colors.customBlack[0] : p.theme.colors.customPink};
    color: ${p => p.theme.white};
    text-align: center;
    box-shadow: 4px 4px 15px rgba(26, 35, 126, 0.2);
    z-index: 100;
  }

  ::after {
    ${p => (p.state === 'open' ? '' : `content: '${p.delayed || ''}'`)};
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    font-size: 3rem;
    color: ${p => p.theme.white};
    place-content: center;
    place-items: center;
    z-index: 200;
    background: url(${p =>
          p.state === 'broken'
            ? BrokenImg
            : p.state === 'closed'
            ? ClosedImg
            : p.state === 'delayed'
            ? DelayedImg
            : ''})
        center center / contain no-repeat,
      ${p => p.theme.black}AA;
  }
`
