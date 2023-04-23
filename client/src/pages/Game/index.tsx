import { useGame } from 'hooks/useGame'
import { Flex } from '@mantine/core'
import Messages from '../../components/Messages/Messages'
import GameContent from './components/GameContent/GameContent'

export function Game () {
  const { messages } = useGame()

  return (
    <Flex h={'100%'} direction={{ base: 'column', sm: 'row' }}>
      <GameContent />
      <Messages messages={messages} />
    </Flex>
  )
}
