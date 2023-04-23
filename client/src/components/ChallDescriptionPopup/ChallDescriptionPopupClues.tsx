import React from 'react'
import { Space, Title } from '@mantine/core'
import { MessagesList } from '../Messages/Messages'
import { Message } from '../../models/Message'

interface ChallDescriptionPopupCluesProps {
  messages: Message[]
}

const ChallDescriptionPopupClues = ({
  messages,
}: ChallDescriptionPopupCluesProps) => {
  return (
    <>
      {!!messages.length && (
        <>
          <Space h="xl" />
          <Title order={3} color="customPink.0">
            Clues
          </Title>
          <MessagesList messages={messages} />
        </>
      )}
    </>
  )
}

export default ChallDescriptionPopupClues
