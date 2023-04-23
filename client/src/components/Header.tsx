import styled from '@emotion/styled'
import { useAuth } from 'hooks/useAuthentication'
import { NavLink } from 'react-router-dom'
import {
  createStyles,
  em,
  Flex,
  getBreakpointValue,
  Group,
  Header as MantineHeader,
  Text,
} from '@mantine/core'
import { Logo } from './Icon'
import { useMediaQuery } from '@mantine/hooks'

const useStyles = createStyles(theme => ({
  groupLink: {
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.md) - 1)})`]:
      {
        gap: '0.62rem',
      },
  },
}))

export const Header = () => {
  const { user, isAuthenticated, isAuthorized, logOut } = useAuth()

  const largeScreen = useMediaQuery('(min-width: 64em)')

  const { classes } = useStyles()
  return (
    <MantineHeader
      height={{ base: 50, md: 70 }}
      bg={isAuthorized ? 'customPink.0' : 'black'}
      px={'md'}
      py={'xs'}
      zIndex={999}
    >
      <Flex align={'center'} h={'100%'} justify={'space-between'}>
        <NavLink to="/">
          <Logo size={largeScreen ? '3rem' : '2.5rem'} color="white" />
        </NavLink>

        {user && (
          <Text color={'white'}>
            {user.username} / {user.team}
          </Text>
        )}

        <Group
          color={'white'}
          fz={{ base: '0.8rem', md: '1rem' }}
          className={classes.groupLink}
        >
          <GameLink to="/scoreboard" label="Scoreboard" />
          <GameLink to="/rules" label="Rules" />
          <GameLink to="/admin" label="Admin" showIf={isAuthorized} />
          <GameLink to="/register" label="Register" showIf={!isAuthenticated} />
          <GameLink to="/login" label="Login" showIf={!isAuthenticated} />
          {isAuthenticated && (
            <NavButton onClick={logOut} style={{ cursor: 'pointer' }}>
              <Text variant={'link'} color={'white'}>
                Logout
              </Text>
            </NavButton>
          )}
        </Group>
      </Flex>
    </MantineHeader>
  )
}

const NavLinkStyled = styled(NavLink)<{ isActive?: boolean }>`
  color: white;
  text-decoration: ${p => (p.isActive ? 'underline' : 'none')};
`

const NavButton = styled.div`
  color: white;
  cursor: pointer;
`

type GameLinkProps = {
  to: string
  label: string
  showIf?: boolean
}

const GameLink = ({ to, label, showIf = true }: GameLinkProps) => {
  if (!showIf) return null

  return <NavLinkStyled to={to}>{label}</NavLinkStyled>
}
