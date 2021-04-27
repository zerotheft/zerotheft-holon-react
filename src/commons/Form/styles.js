import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: row;
  margin: 15px 0;
  & > div {
    ${props =>
    props.centerized &&
      `
        align-items: center;
      `}
  }
`
