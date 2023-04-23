import { ChangeEvent, useState } from 'react'
import { useField, useFieldSelect } from './useField'
import { BaseChallenge, Challenge } from 'models/Challenge'
import { Difficulty } from 'models/Difficulty'
import { useAdmin } from './useAdmin'
import { useAuth } from './useAuthentication'
import { Category } from 'models/Category'

export const useChallengeForm = (
  chall: Challenge | undefined,
  onSuccess: () => void,
) => {
  const isNewChallenge = chall === undefined
  const [isLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const { createChallenge, updateChallenge } = useAdmin()
  const { user: { username } = {} } = useAuth()

  const {
    author,
    category,
    description,
    difficulty,
    img,
    isBroken,
    isOpen,
    name,
  } = chall || {}

  const nameField = useField<string>({
    name: 'name',
    defaultValue: name ?? '',
    disabled: isLoading || !isNewChallenge,
    required: true,
  })

  const authorField = useField<string>({
    name: 'author',
    defaultValue: author ?? username ?? '',
    disabled: isLoading,
    required: true,
  })
  const categoryField = useFieldSelect<Category>({
    name: 'team',
    defaultValue: category ?? 'web',
    disabled: isLoading,
    required: true,
  })
  const descriptionField = useField<string>({
    name: 'description',
    defaultValue: description ?? '',
    disabled: isLoading,
    required: true,
  })

  const difficultyField = useFieldSelect<Difficulty>({
    name: 'difficulty',
    defaultValue: difficulty ?? 'medium',
    disabled: isLoading,
    required: true,
  })

  const flagsField = useField<string>({
    name: 'difficulty',
    defaultValue: '',
    disabled: isLoading,
    required: isNewChallenge,
  })

  const imgField = useField<string | undefined>({
    name: 'img',
    defaultValue: img,
    disabled: isLoading,
  })

  const isBrokenField = useField<boolean | undefined>({
    name: 'isBroken',
    defaultValue: isBroken,
    disabled: isLoading,
  })

  const isOpenField = useField<boolean | undefined>({
    name: 'isBroken',
    defaultValue: isOpen,
    disabled: isLoading,
  })

  const reset = () => {
    nameField.reset()
    authorField.reset()
    categoryField.reset()
    descriptionField.reset()
    difficultyField.reset()
    isBrokenField.reset()
    isOpenField.reset()
  }

  const onFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const payload: BaseChallenge = {
        author: authorField.inputProp.value,
        category: categoryField.inputProp.value,
        description: descriptionField.inputProp.value,
        img: imgField.inputProp.value ?? '',
        difficulty: difficultyField.inputProp.value,
        flag: flagsField.inputProp.value,
        name: nameField.inputProp.value,
      }

      if (chall === undefined) {
        await createChallenge(payload)
      } else {
        await updateChallenge(payload)
      }

      onSuccess()
    } catch (error) {
      setError(error as string)
    }
  }

  const preview: Challenge = {
    author: authorField.inputProp.value,
    category: categoryField.inputProp.value,
    description: descriptionField.inputProp.value,
    difficulty: difficultyField.inputProp.value,
    img: imgField.inputProp.value ?? '',
    isBroken: false,
    isOpen: true,
    name: nameField.inputProp.value,
    flag: flagsField.inputProp.value,
  }

  return {
    formProps: {
      onSubmitCapture: onFormSubmit,
    },
    nameProps: nameField.inputProp,
    authorProps: authorField.inputProp,
    categoryProps: categoryField.inputProp,
    descriptionProps: descriptionField.inputProp,
    difficultyProps: difficultyField.inputProp,
    imgProps: imgField.inputProp,
    flagsProps: flagsField.inputProp,

    isBrokenProps: isNewChallenge ? undefined : isBrokenField.inputProp,
    isOpenProps: isNewChallenge ? undefined : isOpenField.inputProp,

    isNewChallenge,
    isLoading,
    reset,
    error,
    preview,
  }
}
