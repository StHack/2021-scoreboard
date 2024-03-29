import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { ChallDescriptionPopup } from 'components/ChallDescriptionPopup'
import { ChallengeCard } from 'components/ChallengeCard'
import { useAdmin } from 'hooks/useAdmin'
import { useGame } from 'hooks/useGame'
import { Attempt } from 'models/Attempt'
import { Challenge } from 'models/Challenge'
import { ChallengeScore } from 'models/GameScore'
import { Message } from 'models/Message'
import { useState } from 'react'
import { ChallengeForm } from './ChallengeForm'
import { IconBreak, IconCreate, IconEdit, IconRepair } from 'components/Icon'
import { ExportJsonButton } from 'components/ExportJsonButton'
import { SearchInput } from 'components/SearchInput'

export function ChallengePanel () {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const { challenges, attempts, brokeChallenge, repairChallenge } = useAdmin()
  const [challToEdit, setChallToEdit] = useState<Challenge>()
  const [search, setSearch] = useState<string>('')
  const {
    messages,
    score: { challsScore },
  } = useGame()

  return (
    <Box display="flex" flexDirection="column" overflow="hidden" gap="2">
      <Box display="flex" flexDirection="row" gap="2">
        <Button
          onClick={() => setOpenEdit(true)}
          title="Create challenge"
          icon={IconCreate}
          responsiveLabel
        >
          Create challenge
        </Button>
        <ExportJsonButton data={challenges} filename="challenges" />
        <SearchInput
          search={search}
          onChange={setSearch}
          placeholder="Search by chall or author name"
        />
      </Box>

      <Box
        display={['flex', 'grid']}
        flexDirection="column"
        gridTemplateColumns="repeat(auto-fit, minmax(40rem, 1fr))"
        overflowY="auto"
        gap="2"
      >
        {challenges
          .filter(
            c =>
              c.author.toLowerCase().includes(search) ||
              c.name.toLowerCase().includes(search),
          )
          .map(c => (
            <ChallengeBlock
              key={c.name}
              chall={c}
              score={challsScore[c.name]}
              messages={messages.filter(m => m.challenge === c.name)}
              attempts={attempts.filter(a => a.challenge === c.name)}
              onBrokeClick={brokeChallenge}
              onEditClick={() => {
                setChallToEdit(c)
                setOpenEdit(true)
              }}
              onRepairClick={repairChallenge}
            />
          ))}
      </Box>

      {openEdit && (
        <ChallengeForm
          chall={challToEdit}
          onClose={() => {
            setOpenEdit(false)
            setChallToEdit(undefined)
          }}
        />
      )}
    </Box>
  )
}

type ChallengeBlockProps = {
  chall: Challenge
  score: ChallengeScore
  messages: Message[]
  attempts: Attempt[]
  onBrokeClick: (chall: Challenge) => void
  onEditClick: (chall: Challenge) => void
  onRepairClick: (chall: Challenge) => void
}

function ChallengeBlock ({
  chall,
  score,
  messages,
  attempts,
  onBrokeClick,
  onEditClick,
  onRepairClick,
}: ChallengeBlockProps) {
  const { author, category, difficulty, isBroken, name } = chall
  const lastSolve = score.achievements[score.achievements.length - 1]
  const [showPreview, setShowPreview] = useState<boolean>(false)

  return (
    <Box
      bg="background"
      borderColor="secondary"
      borderWidth="medium"
      borderStyle="solid"
      borderRadius="small"
      boxShadow="normal"
      p="1"
      gap="2"
      color={isBroken ? 'red' : ''}
      display="grid"
      gridTemplateColumns="auto 1fr"
      gridTemplateRows="auto 1fr"
      gridTemplateAreas={`
        'card stats'
        'card actions'
      `}
    >
      <Box
        gap="1"
        gridArea="card"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <ChallengeCard
          challenge={chall}
          score={score}
          onClick={() => setShowPreview(true)}
          size={['6', 'initial']}
        />
        <p>
          {category} - {difficulty}
        </p>
        <p>{author}</p>
      </Box>
      <Box gridArea="stats">
        <Box as="h1" fontSize="2">
          {name}
        </Box>
        <p>
          Attempted <b>{attempts.length}</b> times
        </p>
        <p>
          Solved <b>{score.achievements.length}</b> times
          {lastSolve && (
            <span>
              {` (last by "${lastSolve.username}" from "${lastSolve.teamname}")`}
            </span>
          )}
        </p>
      </Box>

      <Box
        gridArea="actions"
        display="flex"
        flexWrap="wrap"
        gap="1"
        alignItems="start"
      >
        {!isBroken && (
          <Button onClick={() => onBrokeClick(chall)} icon={IconBreak}>
            Broke
          </Button>
        )}
        {isBroken && (
          <Button onClick={() => onRepairClick(chall)} icon={IconRepair}>
            Repair
          </Button>
        )}
        <Button onClick={() => onEditClick(chall)} icon={IconEdit}>
          Edit
        </Button>
      </Box>
      {showPreview && (
        <ChallDescriptionPopup
          challenge={chall}
          messages={messages}
          onClose={() => setShowPreview(false)}
          score={score}
          readonly
        />
      )}
    </Box>
  )
}
