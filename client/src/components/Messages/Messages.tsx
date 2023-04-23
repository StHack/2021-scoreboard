import { Message } from 'models/Message'
import { Divider, Flex, Text, Title } from '@mantine/core'

type MessagesProps = {
  messages: Message[]
}
const Messages = ({ messages }: MessagesProps) => {
  return (
    <Flex
      direction={'column'}
      p="lg"
      bg={'gray.2'}
      maw="20rem"
      sx={() => ({ flexShrink: 0 })}
    >
      <Title order={2} color="customPink.0">
        Message from Staff
      </Title>
      <MessagesList messages={messages} />
    </Flex>
  )
}

export default Messages

export const MessagesList = ({ messages }: MessagesProps) => {
  return (
    <>
      {messages
        .map(m => (
          <Flex key={m.createdAt.getTime()} direction="column">
            <Divider my={'xs'} />
            <Title order={5} my={'xs'}>
              {m.createdAt.toLocaleTimeString('fr')}{' '}
              {m.challenge && <span>- {m.challenge} challenge </span>}
            </Title>
            <Text>{m.content}</Text>
          </Flex>
        ))
        .reverse()}
    </>
  )
}
