import { Achievement } from '../../models/Achievement'
import { ChallState } from '../../hooks/useChallengeSolveDelay'
import { usePlayer } from '../../hooks/usePlayer'
import { useField } from '../../hooks/useField'
import { useState } from 'react'
import { Button, Flex, TextInput } from '@mantine/core'

interface ChallengeDescriptionPopupSubmitProps {
  myTeamSolved: Achievement | undefined
  openState: ChallState
  readonly: boolean
  name: string
  onClose: () => void
}

const ChallDescriptionPopupSubmit = ({
  myTeamSolved,
  openState,
  name,
  onClose,
  readonly,
}: ChallengeDescriptionPopupSubmitProps) => {
  const { attemptChall } = usePlayer()
  const { inputProp } = useField<string>({
    defaultValue: '',
    name: 'flag',
    required: true,
    disabled: false,
  })
  const [error, setError] = useState<string>()
  const handleSubmit = async () => {
    if (readonly) return
    if (!inputProp.value) return
    await attemptChall(name, inputProp.value, (isValid, error) => {
      if (error) setError(error)
      if (isValid) onClose()
      else setError("Nope that's not the flag !")
    })
  }
  return (
    <>
      {!myTeamSolved && openState === 'open' && (
        <Flex direction="column" py="md" px="xl">
          <TextInput
            placeholder="Propose your flag"
            {...inputProp}
            disabled={readonly ? true : inputProp.disabled}
            error={error}
            size="md"
          />

          <Button
            sx={{ alignSelf: 'center' }}
            type="submit"
            mt="md"
            disabled={readonly}
            onClick={handleSubmit}
          >
            Submit your flag
          </Button>
        </Flex>
      )}
    </>
  )
}
export default ChallDescriptionPopupSubmit
