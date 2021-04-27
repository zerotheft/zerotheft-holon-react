import styled from 'styled-components'
import { colors } from 'theme'

const statusCommon = `
text-transform: capitalize;
  display: inline-block;
  border-radius: 6px;`

export const Status = styled.span`
  ${statusCommon}
  color: ${props => (props.state === 'good' || props.state === 'active' ? colors.success : colors.error)};
`
export const State = styled.span`
  ${statusCommon}
  color: ${props => (props.state ? colors.success : colors.error)};
  `
