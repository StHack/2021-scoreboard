import { User } from 'models/User'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { login, logout, me } from 'services/authenticate'
import { useStorage } from './useStorage'

export type AuthContext = {
  user?: User
  isAuthenticated: boolean
  isAuthorized: boolean
  hasReadRules: boolean
  readRules: () => void
  logOut: () => Promise<void>
  logIn: (
    username: string,
    password: string,
  ) => Promise<{
    ok: boolean
    error?: string
  }>
}

const authContext = createContext<AuthContext>({
  user: undefined,
  isAuthenticated: false,
  isAuthorized: false,
  hasReadRules: false,
  readRules: () => {},
  logOut: () => Promise.resolve(),
  logIn: () => Promise.resolve({ ok: false, error: 'oups' }),
})

export function ProvideAuth ({ children }: PropsWithChildren<{}>) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth (): AuthContext {
  const [user, setUser] = useState<User>()
  const [hasReadRules, setHasReadRules] = useStorage<boolean>(
    'hasReadRules',
    false,
  )

  useEffect(() => {
    const init = async () => {
      const { ok, user } = await me()
      if (ok) {
        setUser(user)
      }
    }

    init()
  }, [])

  return {
    user,
    isAuthenticated: user !== undefined,
    isAuthorized: !!user?.isAdmin,
    hasReadRules,
    readRules: () => setHasReadRules(true),
    logOut: async () => {
      if (!user) return
      await logout()
      setUser(undefined)
    },
    logIn: async (username: string, password: string) => {
      const { ok, error, user } = await login({
        username,
        password,
      })

      if (ok) {
        setUser(user!)
      }

      return { ok, error }
    },
  }
}
