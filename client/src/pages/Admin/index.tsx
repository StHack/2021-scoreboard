import styled from '@emotion/styled'
import { Link, Route, Routes } from 'react-router-dom'
import { AchievementPanel } from './components/AchievementPanel'
import { ChallengePanel } from './components/ChallengePanel'
import { GeneralPanel } from './components/GeneralPanel'
import { UserPanel } from './components/UserPanel'
import { Box, Flex, Paper, Title } from '@mantine/core'
import { PropsWithChildren } from 'react'

export const Admin = () => {
  return (
    <Box p="xl">
      <Paper p="md" shadow="xl" radius="lg" bg="gray.0">
        <Flex
          justify="center"
          align="center"
          gap="lg"
          direction={{ base: 'column', sm: 'row' }}
        >
          <NavLink to="">General</NavLink>
          <NavLink to="challenges">Challenges</NavLink>
          <NavLink to="users">Users</NavLink>
          <NavLink to="achievements">Achievements</NavLink>
        </Flex>
        <Routes>
          <Route path="" element={<GeneralPanel />} />
          <Route path="challenges" element={<ChallengePanel />} />
          <Route path="users" element={<UserPanel />} />
          <Route path="achievements" element={<AchievementPanel />} />
        </Routes>
      </Paper>
    </Box>
  )
}

const NavLink = ({ to, children }: PropsWithChildren<{ to: string }>) => {
  return (
    <StyledLink to={to}>
      <Title order={2} color="customPink.0">
        {children}
      </Title>
    </StyledLink>
  )
}

const StyledLink = styled(Link)<{ isActive?: boolean }>`
  text-decoration: ${({ isActive }) => (isActive ? 'underline' : 'none')};
  color: ${({ theme }) => theme.colors.customPink[0]};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`
