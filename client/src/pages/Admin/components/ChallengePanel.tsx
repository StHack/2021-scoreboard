import { CategoryImg } from 'components/CategoryImg'
import { useAdmin } from 'hooks/useAdmin'
import { Challenge } from 'models/Challenge'
import { useState } from 'react'
import { exportAsJson } from 'services/share'
import { Box, Button, Flex, Group, Image } from '@mantine/core'
import {
  HeadData,
  RowData,
  TableSort,
} from '../../../components/TableSortFilter/TableSortFilter'
import { ChallengeForm } from './ChallengeForm'

export const ChallengePanel = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const { challenges, brokeChallenge, repairChallenge } = useAdmin()
  const [challToEdit, setChallToEdit] = useState<Challenge>()

  const headers: HeadData[] = [
    { key: 'img', sortable: false, label: '' },
    { key: 'category', sortable: true, label: 'Category' },
    { key: 'name', sortable: true, label: 'Name' },
    { key: 'author', sortable: true, label: 'Author' },
    { key: 'difficulty', sortable: true, label: 'Difficulty' },
    { key: 'action', sortable: false, label: 'Action' },
  ]

  const handleClickActions = (challenge: Challenge, action: string) => {
    switch (action) {
      case 'broke':
        brokeChallenge(challenge)
        break
      case 'repair':
        repairChallenge(challenge)
        break
      case 'edit':
        setChallToEdit(challenge)
        setOpenEdit(true)
        break
    }
  }

  const data: RowData[] = challenges.map(c => {
    return {
      img: <ChallImg challenge={c}></ChallImg>,
      category: c.category,
      name: c.name,
      author: c.author,
      difficulty: c.difficulty,
      action: (
        <ChallActions
          challenge={c}
          handleClick={handleClickActions}
        ></ChallActions>
      ),
    }
  })

  return (
    <Flex direction="column" p="md" mt="xl">
      <Group>
        <Button color="customPink.0" onClick={() => setOpenEdit(true)}>
          Create challenge
        </Button>
        <Button
          variant="outline"
          color="dark"
          onClick={async () => {
            await exportAsJson(challenges, 'challenges')
          }}
        >
          Export as JSON
        </Button>
      </Group>
      <Box mt="xl">
        <TableSort headers={headers} data={data} />
      </Box>
      <ChallengeForm
        onClose={() => {
          setOpenEdit(false)
          setChallToEdit(undefined)
        }}
        chall={challToEdit}
        isOpen={openEdit}
      />
    </Flex>
  )
}

interface ChallImgProps {
  challenge: Challenge
}

const ChallImg = ({ challenge }: ChallImgProps) => {
  return (
    <>
      {challenge.img && <Image src={challenge.img} maw="6rem" />}
      {!challenge.img && (
        <CategoryImg category={challenge.category} maw="6rem" />
      )}
    </>
  )
}

interface ChallActionsProps {
  challenge: Challenge
  handleClick: (chall: Challenge, action: string) => void
}

const ChallActions = ({ challenge, handleClick }: ChallActionsProps) => {
  return (
    <Flex gap="sm">
      {!challenge.isBroken && (
        <Button
          variant="outline"
          color="customPink.0"
          onClick={() => handleClick(challenge, 'broke')}
        >
          Broke it
        </Button>
      )}
      {challenge.isBroken && (
        <Button
          variant="outline"
          color="customPink.0"
          onClick={() => handleClick(challenge, 'repair')}
        >
          Repair it
        </Button>
      )}
      <Button
        variant="outline"
        color="customPink.0"
        onClick={() => {
          handleClick(challenge, 'edit')
        }}
      >
        Edit it
      </Button>
    </Flex>
  )
}
