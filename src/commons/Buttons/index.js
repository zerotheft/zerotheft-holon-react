import styled, { css } from 'styled-components'

import { colors } from 'theme'

const plainProperty = `
  background: #fff;
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
`

const secondaryProperty = `
  color: ${colors.primary};
  background: #fff;
`
const largeProperty = `
  padding: 0 20px;
  font-size: 28px;
  height: 60px;
`

export default styled.button`
  background: ${colors.primary};
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 15px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  font-weight: 600;
  :focus {
    outline: none;
  }
  :disabled {
    opacity: 0.7;
    cursor: no-drop;
  }
  color: #fff;
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  height: ${(props) => `${props.height || 35}px`};
  ${(props) => props.css && css(...props.css)};
  ${(props) => props.plain && plainProperty}
  ${(props) => props.secondary && secondaryProperty}
  ${(props) => props.large && largeProperty}
`
