import * as CSS from 'csstype'
import { FlexboxProps, RequiredTheme, system, Theme } from 'styled-system'

export interface PlaceProps<ThemeType extends Theme = RequiredTheme>
  extends FlexboxProps<ThemeType> {
  placeItems?: CSS.Property.PlaceItems
  placeContent?: CSS.Property.PlaceContent
  placeSelf?: CSS.Property.PlaceSelf
}

export const place = system({
  alignItems: true,
  alignContent: true,
  alignSelf: true,
  justifyItems: true,
  justifyContent: true,
  justifySelf: true,
  placeItems: true,
  placeContent: true,
  placeSelf: true,
})
