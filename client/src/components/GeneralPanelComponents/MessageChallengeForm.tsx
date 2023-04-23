import React, { FormEvent } from 'react'
import { Box, Button, Flex, Select, TextInput, Title } from '@mantine/core'
import { useField, useFieldSelect } from '../../hooks/useField'
import { useAdmin } from '../../hooks/useAdmin'
import { useGame } from '../../hooks/useGame'

const MessageChallengeForm = () => {
  const { challenges } = useGame()
  const { sendMessage } = useAdmin()
  const messageInput = useField<string>({
    defaultValue: '',
    name: 'message',
    disabled: false,
    required: true,
  })
  const messageChallengeInput = useFieldSelect<string>({
    defaultValue: '',
    name: 'message-challenge',
    disabled: false,
  })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    messageInput.inputProp.value &&
      sendMessage(
        messageInput.inputProp.value,
        messageChallengeInput.inputProp.value,
      )
    messageInput.reset()
    messageChallengeInput.reset()
  }
  return (
    <Box my="md">
      <Title order={4} color="customPink.0">
        Send message
      </Title>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="md">
          <TextInput
            placeholder="Broadcast a message to everyone"
            {...messageInput.inputProp}
          ></TextInput>
          <Select
            placeholder="Specify for a challenge (optional)"
            data={challenges.map(c => {
              return {
                value: c.name,
                label: c.name,
              }
            })}
            {...messageChallengeInput.inputProp}
          />
          <Button type="submit" maw="5rem" sx={{ alignSelf: 'flex-end' }}>
            Send
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

export default MessageChallengeForm
