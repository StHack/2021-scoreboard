import styled from '@emotion/styled'
import { Banner } from 'components/Icon'
import { useRegisterForm } from 'hooks/useRegisterForm'
import RegisterLoginContainer from '../components/RegisterLoginContainer'
import { Box, Button, TextInput } from '@mantine/core'

export function Register () {
  const {
    formProps,
    passwordProps,
    teamProps,
    usernameProps,
    error,
    isLoading,
  } = useRegisterForm()

  return (
    <RegisterLoginContainer>
      <Banner mb="4" width="100%" />
      <Form {...formProps}>
        <TextInput label="Username" type="text" {...usernameProps} />
        <TextInput
          label="Password"
          type="password"
          {...passwordProps}
          mt={'md'}
        />
        <TextInput label="Team" type="text" {...teamProps} mt={'md'} />
        {error && (
          <Box bg="red" color="white">
            {error}
          </Box>
        )}
        <Button type="submit" mt={'lg'} m="3" disabled={isLoading}>
          Register
        </Button>
      </Form>
    </RegisterLoginContainer>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
