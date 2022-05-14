import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { Banner } from 'components/Icon'
import { LabelInput } from 'components/LabelInput'
import { TextInput } from 'components/TextInput'
import { useRegisterForm } from 'hooks/useRegisterForm'

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
    <Box display='grid' placeItems='center' maxWidth='60rem' margin='0 auto'>
      <Box display='flex'
           flexDirection='column'
           backgroundColor='#FFFFFF'
           p="5"
           borderRadius='14px'
           boxShadow='0px 0px 4px 0px rgba(201, 201, 201, 0.8)'>
        <Banner mb='4' width='100%' />

        <Form {...formProps}>
          <LabelInput label='Username'>
            <TextInput type='text' {...usernameProps} />
          </LabelInput>

          <LabelInput label='Password'>
            <TextInput type='password' {...passwordProps} />
          </LabelInput>

          <LabelInput label='Team'>
            <TextInput type='text' {...teamProps} />
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
            Register
          </Button>
        </Form>
      </Box>
    </Box>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
