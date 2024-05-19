import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { ProvideAdmin } from 'hooks/useAdmin'
import { useAuth } from 'hooks/useAuthentication'
import { ProvideGame } from 'hooks/useGame'
import { ProvidePlayer } from 'hooks/usePlayer'
import { Game } from 'pages/Game'
import { Login } from 'pages/Login'
import { Register } from 'pages/Register'
import { Rules } from 'pages/Rules'
import { lazy, ReactElement, ReactNode, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const Admin = lazy(() =>
  import('pages/Admin').then(module => ({ default: module.Admin })),
)

const ScoreBoard = lazy(() =>
  import('pages/ScoreBoard').then(module => ({ default: module.ScoreBoard })),
)

const AppBlock = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  min-width: ${p => p.theme.sizes.minimalRequired};
  position: relative;
`

const Container = styled.div`
  overflow: auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
`

export default function App() {
  const { isAuthenticated, isAuthorized, hasReadRules } = useAuth()

  return (
    <ThemeProvider
      theme={theme =>
        isAuthorized
          ? {
              ...theme,
              colors: {
                ...theme.colors,
                secondary: theme.colors.pink,
                secondaryText: theme.colors.white,
              },
            }
          : theme
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <AppBlock>
            <Header />

            <Container>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute
                      condition={isAuthenticated && hasReadRules}
                      fallbackTo={isAuthenticated ? '/rules' : '/login'}
                    >
                      <ProvideGame>
                        <ProvidePlayer>
                          <Game />
                        </ProvidePlayer>
                      </ProvideGame>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/login"
                  element={
                    <ProtectedRoute condition={!isAuthenticated} fallbackTo="/">
                      <ProvideGame>
                        <Login />
                      </ProvideGame>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/register"
                  element={
                    <ProtectedRoute condition={!isAuthenticated} fallbackTo="/">
                      <ProvideGame>
                        <Register />
                      </ProvideGame>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute
                      condition={isAuthenticated && isAuthorized}
                      fallbackTo="/"
                    >
                      <ProvideGame>
                        <ProvideAdmin>
                          <Admin />
                        </ProvideAdmin>
                      </ProvideGame>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/scoreboard"
                  element={
                    <ProvideGame>
                      <ScoreBoard />
                    </ProvideGame>
                  }
                />

                <Route
                  path="/rules"
                  element={
                    <ProvideGame>
                      <Rules />
                    </ProvideGame>
                  }
                />
              </Routes>
            </Container>

            <Footer />
          </AppBlock>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  )
}

type ProtectedRouteProps = {
  children: ReactNode
  condition: boolean
  fallbackTo: string
}

function ProtectedRoute({
  children,
  condition,
  fallbackTo: redirectTo,
}: ProtectedRouteProps): ReactElement {
  if (!condition) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
