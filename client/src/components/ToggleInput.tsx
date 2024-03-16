import styled from '@emotion/styled'
import { PropsWithChildren } from 'react'
import {
  FontSizeProps,
  SpaceProps,
  fontSize,
  space,
} from 'styled-system'

export type ToggleInputProps = {
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
}

export function ToggleInput ({
  checked,
  disabled,
  onChange,
  children,
  ...props
}: PropsWithChildren<ToggleInputProps & FontSizeProps & SpaceProps>) {
  return (
    <Label {...props}>
      <Input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange(e.target.checked)}
      />
      <Span />
      {children}
    </Label>
  )
}

const Input = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
`

const Span = styled.span`
  --offset: 0.25em;
  --diameter: 1.8em;

  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: content-box;
  width: calc(var(--diameter) * 2 + var(--offset) * 2);
  height: calc(var(--diameter) + var(--offset) * 2);
  border-width: ${p => p.theme.borderWidths.thin};
  border-style: solid;
  border-color: ${p => p.theme.colors.primaryText};
  position: relative;
  border-radius: 100vw;
  background-color: ${p => p.theme.colors.primary};
  transition: 250ms;

  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: var(--offset);
    box-sizing: border-box;
    width: var(--diameter);
    height: var(--diameter);
    /* border-width: ${p => p.theme.borderWidths.thin};
    border-style: solid;
    border-color: ${p => p.theme.colors.primaryText}; */
    border-radius: 50%;
    background-color: ${p => p.theme.colors.primaryText};
    transform: translate(0, -50%);
    will-change: transform;
    transition: inherit;
  }
`

const Label = styled.label`
  ${fontSize}
  ${space}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  cursor: pointer;
  gap: 1ch;

  &:focus ${Span}, ${Input}:focus + ${Span} {
    outline-width: ${p => p.theme.borderWidths.medium};
    outline-style: dotted;
    outline-color: ${p => p.theme.colors.primaryText};
    outline-color: -webkit-focus-ring-color;
    outline-offset: 2px;
  }

  &:focus,
  &:focus:not(:focus-visible) ${Span},
  ${Input}:focus:not(:focus-visible) + ${Span} {
    outline: 0;
  }

  &[aria-pressed='true'] ${Span}, ${Input}:checked + ${Span} {
    border-color: ${p => p.theme.colors.secondary};
  }

  &[aria-pressed='true'] ${Span}::before, ${Input}:checked + ${Span}::before {
    background-color: ${p => p.theme.colors.secondary};
    transform: translate(100%, -50%);
  }

  &[disabled] ${Span}, ${Input}:disabled + ${Span} {
    opacity: 0.6;
    filter: grayscale(40%);
    cursor: not-allowed;
  }
`
