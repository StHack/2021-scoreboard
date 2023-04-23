import { ChangeEvent, useEffect, useState } from 'react'

export type FieldProps<T> = {
  defaultValue: T
  name: string
  disabled: boolean
  required?: boolean
}

export const useField = <T>({ defaultValue, ...props }: FieldProps<T>) => {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const reset = () => {
    setValue(defaultValue)
  }

  return {
    inputProp: {
      value,
      ...props,
      onChange: (
        e: ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => setValue(e.target.value as any),
    },
    reset,
  }
}

export const useFieldSelect = <T>({
  defaultValue,
  ...props
}: FieldProps<T>) => {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const reset = () => {
    setValue(defaultValue)
  }

  return {
    inputProp: {
      value,
      ...props,
      onChange: (value: string | null) => {
        value ? setValue(value as any) : setValue('' as any)
      },
    },
    reset,
  }
}
