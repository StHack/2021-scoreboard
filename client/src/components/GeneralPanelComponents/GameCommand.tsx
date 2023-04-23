import React from 'react'
import { Box, Button, Group, Title } from '@mantine/core'
import { useAdmin } from '../../hooks/useAdmin'

const GameCommand = () => {
  const { openGame, closeGame, openRegistration, closeRegistration } =
    useAdmin()
  return (
    <Box my="md">
      <Title order={4} color="customPink.0">
        Game command
      </Title>
      <Group spacing="sm">
        <Button onClick={openGame} sx={{ flexGrow: 0 }}>
          Open Game
        </Button>
        <Button onClick={closeGame} sx={{ flexGrow: 0 }}>
          Close Game
        </Button>
        <Button onClick={openRegistration} sx={{ flexGrow: 0 }}>
          Open Registration
        </Button>
        <Button onClick={closeRegistration} sx={{ flexGrow: 0 }}>
          Close Registration
        </Button>
      </Group>
    </Box>
  )
}

export default GameCommand
