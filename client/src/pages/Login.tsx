import styled from '@emotion/styled'
import { Banner } from 'components/Icon'
import { useLoginForm } from 'hooks/useLoginForm'
import { Link } from 'react-router-dom'
import { Button, Text, TextInput } from '@mantine/core'
import RegisterLoginContainer from '../components/RegisterLoginContainer'

export function Login () {
  const { formProps, passwordProps, usernameProps, error, isLoading } =
    useLoginForm()

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
        {error && (
          <Text px={'sm'} w={'100%'} bg="red" mt={'md'} color="white">
            {error}
          </Text>
        )}
        <Button type="submit" mt={'xl'} m="3" disabled={isLoading}>
          Login
        </Button>
      </Form>
      <RegisterLink to="/register">
        Not registered yet ? Click here
      </RegisterLink>
    </RegisterLoginContainer>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const RegisterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.customBlack[0]};
`
