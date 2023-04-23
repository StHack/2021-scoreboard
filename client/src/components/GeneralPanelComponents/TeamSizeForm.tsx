import React, { FormEvent } from 'react'
import { Box, Button, Group, TextInput, Title } from '@mantine/core'
import { useField } from '../../hooks/useField'
import { useGame } from '../../hooks/useGame'
import { useAdmin } from '../../hooks/useAdmin'

const TeamSizeForm = () => {
  const { gameConfig } = useGame()
  const { setTeamSize } = useAdmin()
  const teamSizeInput = useField<string>({
    defaultValue: '',
    name: 'teamSize',
    disabled: false,
    required: true,
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    teamSizeInput.inputProp.value &&
      setTeamSize(parseInt(teamSizeInput.inputProp.value))
    teamSizeInput.reset()
  }
  return (
    <Box>
      <Title order={4} color="customPink.0">
        Team size
      </Title>
      <form onSubmit={handleSubmit}>
        <Group>
          <TextInput
            type="number"
            placeholder={`Set a new team size limit (currently ${gameConfig.teamSize})`}
            {...teamSizeInput.inputProp}
            sx={{ flexGrow: 1 }}
          ></TextInput>
          <Button type="submit" sx={{ flexShrink: 0, justifySelf: 'flex-end' }}>
            Send
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default TeamSizeForm
