import React, { PropsWithChildren } from 'react'
import { Center, Flex, Paper } from '@mantine/core'

const RegisterLoginContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Center h={'100%'}>
      <Paper shadow={'xl'} radius={'lg'} p={70} bg="gray.0">
        <Flex direction={'column'} gap={'md'}>
          {children}
        </Flex>
      </Paper>
    </Center>
  )
}

export default RegisterLoginContainer
