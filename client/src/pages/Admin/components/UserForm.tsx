import styled from '@emotion/styled'
import { useAdmin } from 'hooks/useAdmin'
import { useField } from 'hooks/useField'
import { User } from 'models/User'
import { useEffect } from 'react'
import { Button, Group, Modal, TextInput, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export type UserEditMode = 'password' | 'team'

export type UserFormProps = {
  user: User
  editMode: UserEditMode
  onClose: () => void
}

export const UserForm = ({ user, editMode, onClose }: UserFormProps) => {
  const [modalOpened, { open, close }] = useDisclosure(false)
  const { changePassword, changeTeam } = useAdmin()
  const { inputProp } = useField<string>({
    defaultValue: '',
    disabled: false,
    name: editMode,
    required: true,
  })

  useEffect(() => {
    open()
  }, [open])

  const handleCloseModal = () => {
    close()
    onClose()
  }
  const onSubmit = () => {
    switch (editMode) {
      case 'password':
        changePassword(user, inputProp.value)
        onClose()
        break
      case 'team':
        changeTeam(user, inputProp.value)
        onClose()
        break
    }
  }

  return (
    <Modal
      opened={modalOpened}
      onClose={handleCloseModal}
      centered
      size="xl"
      withCloseButton={false}
    >
      <Title order={2} ta="center" color="customPink.0">
        {`Update user ${user.username} ${editMode}`}
      </Title>
      <Form>
        <TextInput
          label={editMode === 'password' ? 'Password' : 'Text'}
          type={editMode === 'password' ? 'password' : 'text'}
          minLength={5}
          withAsterisk
          {...inputProp}
        />
      </Form>
      <Group grow mt="xl">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button color="customPink.0" onClick={onSubmit}>
          Confirm
        </Button>
      </Group>
    </Modal>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
