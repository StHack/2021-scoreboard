import { Achievement } from 'models/Achievement'
import { BaseChallenge, Challenge } from 'models/Challenge'
import { ServerError } from 'models/ServerError'
import { User } from 'models/User'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useSocket } from './useSocket'
import { Attempt } from 'models/Attempt'

export type AdminContext = {
  challenges: Challenge[]
  users: User[]
  attempts: Attempt[]
  createChallenge: (chall: BaseChallenge) => Promise<Challenge>
  updateChallenge: (chall: BaseChallenge) => Promise<Challenge>
  brokeChallenge: (chall: Challenge) => void
  repairChallenge: (chall: Challenge) => void
  openGame: () => void
  closeGame: () => void
  openRegistration: () => void
  closeRegistration: () => void
  setTeamSize: (teamSize: number) => void
  changeTeam: (user: User, team: string) => void
  changePassword: (user: User, password: string) => void
  toggleIsAdmin: (user: User) => void
  deleteUser: (user: User) => void
  deleteAchievement: (achievement: Achievement) => void
  sendMessage: (message: string, challenge?: string) => void
}

const adminContext = createContext<AdminContext>({
  challenges: [],
  users: [],
  attempts: [],
  createChallenge: () => Promise.resolve<Challenge>(undefined as any),
  updateChallenge: () => Promise.resolve<Challenge>(undefined as any),
  brokeChallenge: () => {},
  repairChallenge: () => {},
  openGame: () => {},
  closeGame: () => {},
  openRegistration: () => {},
  closeRegistration: () => {},
  setTeamSize: () => {},
  changeTeam: () => {},
  changePassword: () => {},
  toggleIsAdmin: () => {},
  deleteUser: () => {},
  deleteAchievement: () => {},
  sendMessage: () => {},
})

export function ProvideAdmin ({ children }: PropsWithChildren<{}>) {
  const admin = useProvideAdmin()
  return <adminContext.Provider value={admin}>{children}</adminContext.Provider>
}

export const useAdmin = () => {
  return useContext(adminContext)
}

function useProvideAdmin (): AdminContext {
  const { socket } = useSocket('/api/admin')
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [attempts, setAttempts] = useState<Attempt[]>([])

  useEffect(() => {
    if (!socket) return

    socket.emit('challenge:list', (response: Challenge[]) => {
      setChallenges([...response])
    })

    socket.emit('users:list', (users: User[]) => {
      setUsers([...users])
    })

    socket.emit('attempt:list', (attempts: Attempt[]) => {
      setAttempts(
        attempts.map(a => ({ ...a, createdAt: new Date(a.createdAt) })),
      )
    })

    socket.on('challenge:added', (chall: Challenge) =>
      setChallenges(challs => [...challs, chall]),
    )

    socket.on('challenge:updated', (challUpdated: Challenge) =>
      setChallenges(challs =>
        challs.map(c => (c.name === challUpdated.name ? challUpdated : c)),
      ),
    )

    socket.on('attempt:added', (attempt: Attempt) =>
      setAttempts(attempts => [
        { ...attempt, createdAt: new Date(attempt.createdAt) },
        ...attempts,
      ]),
    )

    return () => {
      socket.off('challenge:added')
      socket.off('challenge:updated')
    }
  }, [socket])

  const updateUsers = (user: User) =>
    setUsers(users.map(u => (u.username === user.username ? user : u)))

  return {
    users,
    challenges,
    attempts,
    createChallenge: chall =>
      new Promise<Challenge>((resolve, reject) => {
        if (!socket) throw new Error('connection is not available')

        socket.emit(
          'challenge:create',
          chall,
          (response: Challenge | ServerError) => {
            if ('error' in response) {
              reject(response.error)
            } else {
              resolve(response)
            }
          },
        )
      }),
    updateChallenge: chall =>
      new Promise<Challenge>((resolve, reject) => {
        if (!socket) throw new Error('connection is not available')

        socket.emit(
          'challenge:update',
          chall.name,
          chall,
          (response: Challenge | ServerError) => {
            if ('error' in response) {
              reject(response.error)
            } else {
              resolve(response)
            }
          },
        )
      }),
    brokeChallenge: chall => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('challenge:broke', chall.name)
    },
    repairChallenge: chall => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('challenge:repair', chall.name)
    },
    openGame: () => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('game:open')
    },
    closeGame: () => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('game:end')
    },
    openRegistration: () => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('game:openRegistration')
    },
    closeRegistration: () => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('game:closeRegistration')
    },
    setTeamSize: teamSize => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('game:setTeamSize', teamSize)
    },
    changeTeam: (user, team) => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('users:changeTeam', user.username, team, updateUsers)
    },
    changePassword: (user, password) => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('users:changePassword', user.username, password, updateUsers)
    },
    toggleIsAdmin: user => {
      if (!socket) throw new Error('connection is not available')

      socket.emit(
        'users:changeIsAdmin',
        user.username,
        !user.isAdmin,
        updateUsers,
      )
    },
    deleteUser: user => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('users:delete', user.username, () =>
        setUsers(users.filter(u => u.username !== user.username)),
      )
    },
    deleteAchievement: achievement => {
      if (!socket) throw new Error('connection is not available')

      socket.emit(
        'achievement:delete',
        achievement.teamname,
        achievement.challenge,
      )
    },
    sendMessage: (message, challenge) => {
      if (!socket) throw new Error('connection is not available')

      socket.emit('game:sendMessage', message, challenge)
    },
  }
}
