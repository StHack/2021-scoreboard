import styled from '@emotion/styled'
import { Header } from 'components/Header'
import { ProvideAdmin } from 'hooks/useAdmin'
import { useAuth } from 'hooks/useAuthentication'
import { ProvideGame } from 'hooks/useGame'
import { ProvidePlayer } from 'hooks/usePlayer'
import { Admin } from 'pages/Admin'
import { Game } from 'pages/Game'
import { Login } from 'pages/Login'
import { Register } from 'pages/Register'
import { Rules } from 'pages/Rules'
import { ScoreBoard } from 'pages/ScoreBoard'
import { ReactElement, ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@mantine/core'

const App = () => {
  const { isAuthenticated, isAuthorized } = useAuth()

  return (
    <BrowserRouter>
      <AppShell header={<Header />} navbarOffsetBreakpoint="sm" padding={0}>
        <AppWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute condition={isAuthenticated} fallbackTo="/login">
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
                  <Login />
                </ProtectedRoute>
              }
            />

            <Route
              path="/register"
              element={
                <ProtectedRoute condition={!isAuthenticated} fallbackTo="/">
                  <Register />
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
        </AppWrapper>
      </AppShell>
    </BrowserRouter>
  )
}
export default App

type ProtectedRouteProps = {
  children: ReactNode
  condition: boolean
  fallbackTo: string
}

const ProtectedRoute = ({
  children,
  condition,
  fallbackTo: redirectTo,
}: ProtectedRouteProps): ReactElement => {
  if (!condition) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

const AppWrapper = styled.div`
  height: 100%;
  background-color: #eaeaea;
  background-size: 8px 8px;
  background-image: linear-gradient(
      transparent 0%,
      transparent 62.5%,
      #fff 62.5%,
      #fff 100%
    ),
    linear-gradient(
      to right,
      transparent 0%,
      transparent 62.5%,
      #fff 62.5%,
      #fff 100%
    );
`
