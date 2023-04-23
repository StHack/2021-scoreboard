import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { FunctionComponent, SVGProps } from 'react'
import {
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system'
import { place, PlaceProps } from 'styles'
import { ReactComponent as BannerSvg } from './images/Banner.svg'
import { ReactComponent as LogoSvg } from './images/Logo.svg'

type StyledIconProps = SpaceProps & PlaceProps & ColorProps & LayoutProps

const BaseSvg = (svg: FunctionComponent<SVGProps<SVGSVGElement>>) =>
  styled(svg)<StyledIconProps>(
    space,
    place,
    color,
    layout,
    css`
      fill: currentColor;
    `,
  )

export const Logo = BaseSvg(LogoSvg)
export const Banner = BaseSvg(BannerSvg)
