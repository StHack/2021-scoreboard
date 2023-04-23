import { useGame } from 'hooks/useGame'
import { GameConfig } from 'models/GameConfig'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownRenderers } from 'styles/react-markdown'
import { Center, Paper } from '@mantine/core'

export const Rules = () => {
  const { gameConfig } = useGame()

  return (
    <Center h={'100%'} p={{ base: 0, md: 'lg' }}>
      <Paper
        shadow={'xl'}
        radius={'lg'}
        p={{ base: 'xs', md: 'xl' }}
        bg="gray.0"
        fz={{ base: '0.8rem', md: '1rem' }}
        maw="100vw"
      >
        <ReactMarkdown
          components={ReactMarkdownRenderers}
          children={rulesMarkdown(gameConfig)}
        />
      </Paper>
    </Center>
  )
}

const rulesMarkdown = (gameConfig: GameConfig) => `
# Rules

## CTF Rules

- Team size limit is ${gameConfig.teamSize}
- Remote players are not allowed
- Sharing flags is forbidden
- Don't attack the scoring system
- Denial of Service on our infrastructure means expulsion and adding your name to the wall of shame

> We reserve the rights to disqualify any cheating team.

## Scoring

This year the scoring is dynamic, the formula is the following:

\`\`\`text
chall_points = (base_score * base_difficulty) * (total_teams - solvers)
\`\`\`

Where:

- \`base_score\` is the constant **${gameConfig.baseChallScore}**
- \`base_difficulty\` is
  - easy: **1**
  - medium: **2**
  - hard: **3**
- \`total_teams\` is the total number of teams playing the CTF (Currently: ${
  gameConfig.teamCount
})
- \`solvers\` is the number of teams that solved this challenge

This means you should expect the challenge points and your score to:

- increase at the beginning of the CTF, when teams are registering
- decrease while people solve challenges

There is no bonus points for breakthrough.

When a team solves a challenge, it is locked for **${
  gameConfig.solveDelay / 60 / 1000
} minutes**. During this time, no one will be able to submit their proposals.

## Help/Questions

You can come and ask us your questions directly at the staff desk.
Follow us on twitter at <https://twitter.com/sth4ck>
`
