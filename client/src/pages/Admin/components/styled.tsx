import styled from '@emotion/styled'
import {
  color,
  ColorProps,
  size,
  SizeProps,
  space,
  SpaceProps,
} from 'styled-system'
import { cleanStyledSystem } from 'styles'

export const Image = styled.img<SizeProps>`
  object-fit: contain;
  ${size}
`
export const ActionPanel = styled.td<SpaceProps>`
  display: flex;

  > * {
    ${space}
  }
`
export const Table = styled.table<SpaceProps>`
  border-collapse: collapse;
  border-radius: 5px;

  ${space}
  thead tr {
    background-color: transparent !important;
  }

  thead th:first-child {
    border-top-left-radius: 8px;
  }

  thead th:last-child {
    border-top-right-radius: 8px;
  }

  th {
    background-color: rgb(235, 235, 235);
    height: 30px;
    line-height: 30px;
    font-weight: ${p => p.theme.fontWeights[1]};
    font-size: ${p => p.theme.fontSizes[0]};
  }

  td {
    text-align: center;
  }

  tr:nth-of-type(even) {
    background-color: rgb(250, 250, 250);
  }

  tr:nth-of-type(odd) {
    background-color: rgb(245, 245, 245);
  }
`
export const Tr = styled('tr', cleanStyledSystem)<ColorProps>`
  ${color}
`
