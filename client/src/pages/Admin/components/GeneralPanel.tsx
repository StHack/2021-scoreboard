import { Flex } from '@mantine/core'
import MessageChallengeForm from '../../../components/GeneralPanelComponents/MessageChallengeForm'
import TeamSizeForm from '../../../components/GeneralPanelComponents/TeamSizeForm'
import GameCommand from '../../../components/GeneralPanelComponents/GameCommand'

export const GeneralPanel = () => {
  return (
    <Flex
      direction="column"
      p="md"
      mt="xl"
      h={'100%'}
      maw={{ base: '100%', sm: '50%' }}
    >
      <MessageChallengeForm />
      <TeamSizeForm />
      <GameCommand />
    </Flex>
  )
}
