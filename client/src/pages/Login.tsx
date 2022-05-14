import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { Banner } from 'components/Icon'
import { LabelInput } from 'components/LabelInput'
import { TextInput } from 'components/TextInput'
import { useLoginForm } from 'hooks/useLoginForm'
import { Link } from 'react-router-dom'

export function Login () {
  const { formProps, passwordProps, usernameProps, error, isLoading } =
    useLoginForm()

  return (
    <Box display='grid' placeItems='center' maxWidth='60rem' margin='0 auto'>
      <Box display='flex'
           flexDirection='column'
           backgroundColor='#FFFFFF'
           padding="5"
           borderRadius='14px'
           boxShadow="small">
        <Banner mb='4' width='100%' />

        <Form {...formProps}>
          <LabelInput label='Username'>
            <TextInput type='text' {...usernameProps} />
          </LabelInput>

          <LabelInput label='Password'>
            <TextInput type='password' {...passwordProps} />
          </LabelInput>

          {error && (
            <Box backgroundColor='red' color='white'>
              {error}
            </Box>
          )}

          <Button
            type='submit'
            fontSize='2'
            placeSelf='center'
            m='3'
            disabled={isLoading}
          >
            Login
          </Button>
        </Form>

        <Link to='/register'>Not registered yet ? Click here</Link>
      </Box>
    </Box>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
