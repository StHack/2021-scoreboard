import { Difficulty } from './Difficulty.ts'

export type BaseChallenge = {
  name: string
  description: string
  img: string
  author: string
  flag?: string
  salt: string
  category: string
  difficulty: Difficulty
}

export type Challenge = BaseChallenge & {
  isBroken: boolean
  _id: string
}
