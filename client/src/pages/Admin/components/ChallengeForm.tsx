import { useChallengeForm } from 'hooks/useChallengeForm'
import { Challenge } from 'models/Challenge'
import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Group,
  Modal,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Categories } from '../../../models/Category'
import { Difficulties } from '../../../models/Difficulty'
import { ImageInput } from '../../../components/ImageInput'
import styled from '@emotion/styled'
import { ChallDescriptionPopup } from '../../../components/ChallDescriptionPopup/ChallDescriptionPopup'

export type AdminProps = {
  chall?: Challenge
  onClose: () => void
  isOpen: boolean
}

export const ChallengeForm = ({
  chall,
  onClose,
  isOpen = false,
}: AdminProps) => {
  const {
    formProps,
    nameProps,
    authorProps,
    categoryProps,
    descriptionProps,
    difficultyProps,
    imgProps,
    flagsProps,
    error,
    isNewChallenge,
    preview,
  } = useChallengeForm(chall, onClose)
  const ref = useRef<HTMLFormElement>(null)
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [modalOpened, { open, close }] = useDisclosure(false)

  const dataCategory = Categories.map(cat => ({ value: cat, label: cat }))
  const dataDifficulties = Difficulties.map(difficulty => ({
    value: difficulty,
    label: difficulty,
  }))

  const [title, setTitle] = useState('Create a new challenge')

  useEffect(() => {
    isOpen ? open() : close()
  }, [isOpen, open, close])

  useEffect(() => {
    setTitle(
      isNewChallenge
        ? 'Create a new challenge'
        : `Edition of challenge "${chall?.name}"`,
    )
  }, [chall?.name, isNewChallenge])

  const handleCloseModal = () => {
    onClose()
  }
  const handleSubmit = () => {
    ref.current?.requestSubmit() && onClose()
  }

  return (
    <>
      {!showPreview && (
        <Modal
          centered
          size="xl"
          withCloseButton={false}
          opened={modalOpened}
          onClose={handleCloseModal}
        >
          <Title order={2} ta="center" color="customPink.0">
            {title}
          </Title>
          <Form ref={ref} {...formProps}>
            <TextInput label="Name" withAsterisk {...nameProps} />
            <TextInput label="Author" withAsterisk {...authorProps} />
            <Textarea
              label="Description (markdown format)"
              minRows={6}
              withAsterisk
              {...descriptionProps}
            />
            <TextInput
              label="Flag"
              withAsterisk={isNewChallenge}
              {...flagsProps}
            />
            <Select
              label="Category"
              data={dataCategory}
              {...categoryProps}
              withAsterisk
            />
            <Select
              label="Difficulty"
              data={dataDifficulties}
              {...difficultyProps}
              withAsterisk
            />
            <ImageInput {...imgProps} />
            {error && (
              <Text c="white" bg="red">
                {error}
              </Text>
            )}
          </Form>
          <Group grow mt="xl">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => setShowPreview(v => !v)}>
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button color="customPink.0" onClick={handleSubmit}>
              Confirm
            </Button>
          </Group>
        </Modal>
      )}
      {showPreview && (
        <ChallDescriptionPopup
          challenge={preview}
          messages={[]}
          score={{ achievements: [], score: 100 }}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`
