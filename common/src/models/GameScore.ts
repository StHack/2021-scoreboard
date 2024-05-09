import { Achievement } from './Achievement.js'
import { Reward } from './Reward.js'

export type ChallengeScore = {
  name: string
  score: number
  achievements: Achievement[]
}

export type TeamScore = {
  rank: number
  team: string
  score: number
  breakthroughs: Achievement[]
  solved: Achievement[]
  rewards: Reward[]
}

export type GameScore = {
  challsScore: Record<string, ChallengeScore>
  teamsScore: TeamScore[]
}

export type PlayerScore = {
  myScore: number
  myTeamScore: number
}