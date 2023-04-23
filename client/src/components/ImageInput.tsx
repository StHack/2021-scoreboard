import { InputHTMLAttributes } from 'react'
import { Box, FileInput, Image as MantineImage, rem } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'

export const ImageInput = ({
  value,
  onChange,
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Box>
      {value && (
        <MantineImage
          src={value as string}
          alt=""
          maw={240}
          mx="auto"
          onClickCapture={e => {
            e.preventDefault()
            onChange?.({ target: { value: undefined } } as any)
          }}
        />
      )}

      {!value && (
        <FileInput
          label="Image"
          placeholder="Upload an image"
          accept="image/png,image/jpeg"
          icon={<IconUpload size={rem(14)} />}
          onChange={async file => {
            if (file) {
              const webp = await convertToWebp(file)
              const image = await toBase64(webp)
              onChange?.({ target: { value: image } } as any)
            }
          }}
        />
      )}
    </Box>
  )
}

const toBase64 = (file?: File): Promise<string | undefined> => {
  if (!file) {
    return Promise.resolve(undefined)
  }

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result!.toString())
    reader.onerror = error => reject(error)
  })
}

const convertToWebp = (file?: File): Promise<File | undefined> => {
  if (!file) {
    return Promise.resolve(undefined)
  }

  return new Promise<File | undefined>((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      canvas.getContext('2d')!.drawImage(image, 0, 0)
      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error())
        }

        resolve(
          new File([blob!], 'my-new-name.webp', {
            type: blob!.type,
          }),
        )
      }, 'image/webp')
    }

    image.src = URL.createObjectURL(file)
  })
}
