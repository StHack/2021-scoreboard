import { useAdmin } from 'hooks/useAdmin'
import { User } from 'models/User'
import { useState } from 'react'
import { UserEditMode, UserForm } from './UserForm'
import { exportAsJson } from 'services/share'
import { Box, Button, Flex, Group } from '@mantine/core'
import {
  HeadData,
  RowData,
  TableSort,
} from '../../../components/TableSortFilter/TableSortFilter'

interface UserActionsProps {
  user: User
  handleClick: (user: User, action: string) => void
}

export const UserPanel = () => {
  const { users, toggleIsAdmin, deleteUser } = useAdmin()
  const [userToEdit, setUserToEdit] = useState<User>()
  const [userEditMode, setUserEditMode] = useState<UserEditMode>()

  const handleClickActions = (user: User, actions: string) => {
    switch (actions) {
      case 'changePassword':
        setUserToEdit(user)
        setUserEditMode('password')
        break
      case 'changeTeam':
        setUserToEdit(user)
        setUserEditMode('team')
        break
      case 'adminRight':
        if (user.isAdmin) {
          toggleIsAdmin(user)
        } else if (
          // eslint-disable-next-line no-restricted-globals
          confirm(
            `Are you sure to grant user "${user.username}" admin privilege ?`,
          )
        ) {
          toggleIsAdmin(user)
        }
        break
      case 'delete':
        if (
          // eslint-disable-next-line no-restricted-globals
          confirm(
            `Are you sure to delete User:\n\n${user.username}\n${user.team}`,
          )
        ) {
          deleteUser(user)
        }
        break
    }
  }

  const headers: HeadData[] = [
    { key: 'user', sortable: true, label: 'User' },
    { key: 'team', sortable: true, label: 'Team' },
    { key: 'isAdmin', sortable: false, label: 'Is admin' },
    { key: 'actions', sortable: false, label: 'Actions' },
  ]

  const data: RowData[] = users.map(user => {
    return {
      user: user.username,
      team: user.team,
      isAdmin: user.isAdmin ? '✔' : '❌',
      actions: <UserActions user={user} handleClick={handleClickActions} />,
    }
  })

  return (
    <Flex direction="column" p="md" mt="xl">
      <Group>
        <Button
          variant="outline"
          color="dark"
          onClick={async () => {
            await exportAsJson(users, 'users')
          }}
        >
          Export as JSON
        </Button>
      </Group>
      <Box mt="xl">
        <TableSort headers={headers} data={data} />
      </Box>
      {userToEdit && userEditMode && (
        <UserForm
          user={userToEdit}
          editMode={userEditMode}
          onClose={() => {
            setUserToEdit(undefined)
            setUserEditMode(undefined)
          }}
        />
      )}
    </Flex>
  )
}

const UserActions = ({ user, handleClick }: UserActionsProps) => {
  return (
    <Group>
      <Button
        variant="outline"
        onClick={() => handleClick(user, 'changePassword')}
      >
        Change Password
      </Button>
      <Button variant="outline" onClick={() => handleClick(user, 'changeTeam')}>
        Change Team
      </Button>
      <Button
        w="169px"
        maw="169px"
        variant="outline"
        onClick={() => handleClick(user, 'adminRight')}
      >
        {user.isAdmin ? 'Revoke admin right' : 'Promote to admin'}
      </Button>
      <Button color="red" onClick={() => handleClick(user, 'delete')}>
        Delete User
      </Button>
    </Group>
  )
}
