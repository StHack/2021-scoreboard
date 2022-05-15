import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonHTMLAttributes } from 'react'
import {
  border,
  BorderProps,
  color,
  ColorProps,
  FontSizeProps,
  FontWeightProps,
  gridArea,
  GridAreaProps,
  SizeProps,
  space,
  SpaceProps,
  typography,
  variant,
} from 'styled-system'
import { cleanStyledSystem, place, PlaceProps } from 'styles'
import { Icon } from './Icon'

type StyledButtonProps = SpaceProps &
  GridAreaProps &
  PlaceProps &
  ColorProps &
  BorderProps &
  FontSizeProps &
  SizeProps &
  FontWeightProps & {
    variant?: 'primary' | 'secondary' | 'link' | 'danger'
    href?: string
  }

const Btn = styled('button', cleanStyledSystem)<StyledButtonProps>(
  space,
  color,
  border,
  typography,
  gridArea,
  place,
  variant({
    scale: 'buttons',
    variants: {
      primary: {},
    },
  }),
  css`
    display: flex;
    cursor: pointer;

    :disabled {
      cursor: default;
    }
  `,
)

export type ButtonProps = StyledButtonProps & {
  icon?: Icon
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button ({
  icon: Icon,
  children,
  variant,
  href,
  size = 1,
  ...rest
}: ButtonProps) {
  const defaultPaddingFix = !!Icon && !children ? { px: 2, py: 2 } : {}
  const asLink = href ? { as: 'a', href, target: '_blank' } : ({} as any)

  return (
    <Btn variant={variant} {...asLink} {...rest} {...defaultPaddingFix}>
      {Icon && (
        <Icon size={size} marginRight={children ? 2 : 0} color="currentColor" />
      )}
      {children}
    </Btn>
  )
}

Button.defaultProps = {
  variant: 'primary',
  px: 3,
  py: 2,
  fontWeight: 1,
  fontSize: 1,
  border: 'currentColor solid',
  borderWidth: 'thin',
  borderRadius: 4,
  placeItems: 'center',
  placeContent: 'center',
}
