import { Box } from 'components/Box'
import { ToggleInput } from 'components/ToggleInput'
import { useAuth } from 'hooks/useAuthentication'
import { useGame } from 'hooks/useGame'
import { GameConfig } from 'models/GameConfig'
import ReactMarkdown from 'react-markdown'
import { useNavigate } from 'react-router-dom'
import { ReactMarkdownRenderers } from 'styles/react-markdown'

export function Rules () {
  const { gameConfig } = useGame()
  const { isAuthenticated, hasReadRules, readRules } = useAuth()
  const navigate = useNavigate()

  return (
    <Box
      justifySelf="center"
      px="2"
      py="5"
      maxWidth="maximalCentered"
      gap="5"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        p="4"
        pt="1"
        borderRadius="2"
        boxShadow="small"
        backgroundColor="background"
        overflow="hidden"
      >
        <ReactMarkdown
          components={ReactMarkdownRenderers}
          children={rulesMarkdown(gameConfig)}
        />
        {isAuthenticated && (
          <Box display="grid" placeContent="center" py="4">
            <ToggleInput
              checked={hasReadRules}
              onChange={() => {
                readRules()
                navigate('/')
              }}
              disabled={hasReadRules}
            >
              I confirm that I have read and accepted the CTF rules
            </ToggleInput>
          </Box>
        )}
      </Box>

      <Box
        p="4"
        pt="1"
        borderRadius="2"
        boxShadow="small"
        backgroundColor="background"
      >
        <ReactMarkdown
          components={ReactMarkdownRenderers}
          children={creditsMarkdown}
        />
      </Box>
    </Box>
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
team_points = chall_point + reward_points
\`\`\`

Where:

- \`base_score\` is the constant **${gameConfig.baseChallScore}**
- \`base_difficulty\` is
  - special: **0**
  - easy: **1**
  - medium: **2**
  - hard: **3**
- \`total_teams\` is the total number of teams playing the CTF (Currently: ${
  gameConfig.teamCount
})
- \`solvers\` is the number of teams that solved this challenge
- \`reward_points\` is the sum of bonus points given by the staff when special challenge is solved

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

const creditsMarkdown = `
# Credits

- Background Image (Hand drawn flat design mountain landscape) by [Freepik](https://www.freepik.com/free-vector/hand-drawn-flat-design-mountain-landscape_20008383.htm#query=svg%20background%20nature&position=17&from_view=search&track=ais)
`
