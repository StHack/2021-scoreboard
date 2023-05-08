import { exportAsJson } from 'services/share'
import { Button } from './Button'
import { IconJson } from './Icon'

type ExportJsonButtonProps = {
  data: any
  filename: string
}

export function ExportJsonButton ({ data, filename }: ExportJsonButtonProps) {
  return (
    <Button
      type="button"
      onClick={() => {
        exportAsJson(data, filename)
      }}
      icon={IconJson}
      responsiveLabel
      title="Export as JSON"
    >
      Export as JSON
    </Button>
  )
}
