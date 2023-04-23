import { useAdmin } from 'hooks/useAdmin'
import { useGame } from 'hooks/useGame'
import { exportAsJson } from 'services/share'
import { Box, Button, Flex, Group } from '@mantine/core'
import {
  HeadData,
  RowData,
  TableSort,
} from '../../../components/TableSortFilter/TableSortFilter'
import { Achievement } from '../../../models/Achievement'

export const AchievementPanel = () => {
  const { achievements } = useGame()
  const { deleteAchievement } = useAdmin()

  const handleClickActions = (achievement: Achievement, action: string) => {
    switch (action) {
      case 'delete':
        if (
          // eslint-disable-next-line no-restricted-globals
          confirm(
            `Are you sure to delete Achievement:\n\n${achievement.challenge}\n${
              achievement.teamname
            }\n${achievement.username}\n${achievement.createdAt.toISOString()}`,
          )
        ) {
          deleteAchievement(achievement)
        }

        break
    }
  }

  const headers: HeadData[] = [
    { key: 'challenge', sortable: true, label: 'Challenge' },
    { key: 'team', sortable: true, label: 'Team' },
    { key: 'username', sortable: true, label: 'User' },
    { key: 'date', sortable: true, label: 'Date' },
    { key: 'action', sortable: false, label: 'Action' },
  ]

  const data: RowData[] = achievements.map(achievement => {
    return {
      challenge: achievement.challenge,
      team: achievement.teamname,
      username: achievement.username,
      date: achievement.createdAt,
      action: (
        <AchievementActions
          achievement={achievement}
          handleClick={handleClickActions}
        />
      ),
    }
  })

  return (
    <Flex direction="column" p="md" mt="xl">
      <Group>
        <Button
          variant="outline"
          color="dark"
          onClick={async () => {
            await exportAsJson(achievements, 'achievements')
          }}
        >
          Export as JSON
        </Button>
      </Group>
      <Box mt="xl">
        <TableSort
          sortOptions={{ sortBy: 'date', reversed: true }}
          headers={headers}
          data={data}
        />
      </Box>
    </Flex>
  )
}

interface AchievementActionsProps {
  achievement: Achievement
  handleClick: (achievement: Achievement, action: string) => void
}

const AchievementActions = ({
  achievement,
  handleClick,
}: AchievementActionsProps) => {
  return (
    <Group>
      <Button color="red" onClick={() => handleClick(achievement, 'delete')}>
        Delete
      </Button>
    </Group>
  )
}
