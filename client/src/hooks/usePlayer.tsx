import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { useAuth } from './useAuthentication'
import { useGame } from './useGame'
import { useSocket } from './useSocket'
import { Message } from 'models/Message'

export type PlayerContext = {
  myScore: number
  myTeamScore: number
  myTeamName: string
  readMessages: string[]
  attemptChall: (
    challName: string,
    flag: string,
    callback: (isValid: boolean, error: string | undefined) => void,
  ) => Promise<void>
  markMessageAsRead: (message: Message) => void
}

const playerContext = createContext<PlayerContext>({
  myScore: 0,
  myTeamScore: 0,
  myTeamName: '',
  readMessages: [],
  attemptChall: () => Promise.resolve(undefined),
  markMessageAsRead: () => {},
})

export function ProvidePlayer ({ children }: PropsWithChildren<{}>) {
  const player = useProvidePlayer()
  return (
    <playerContext.Provider value={player}>{children}</playerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(playerContext)
}

function useProvidePlayer (): PlayerContext {
  const { socket } = useSocket('/api/player')
  const { user } = useAuth()
  const {
    score: { teamsScore, challsScore },
  } = useGame()
  const [readMessages, setReadMessages] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('readMessages') ?? '[]'),
  )
  const ts = teamsScore.find(x => x.team === user?.team)
  const myScore = Object.values(challsScore)
    .filter(cs => !!cs.achievements.find(a => a.username === user?.username))
    .reduce((agg, a) => agg + a.score, 0)

  return {
    myScore,
    myTeamScore: ts?.score ?? 0,
    myTeamName: user?.team ?? '',
    readMessages,
    attemptChall: async (challName, flag, callback) => {
      if (!socket) return
      socket.emit(
        'challenge:solve',
        challName,
        flag,
        ({ isValid, error }: { isValid?: boolean; error?: string }) =>
          callback(isValid ?? false, error),
      )
    },
    markMessageAsRead: (message) => {
      const updated = [...readMessages, message._id]
      localStorage.setItem('readMessages', JSON.stringify(updated))
      setReadMessages(updated)
    },
  }
}
