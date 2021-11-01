import React from 'react'
import { APP_VERSION } from 'constants/index'

import styled from 'styled-components'

import { colors, height } from 'theme'
import { Container } from 'commons/styles'

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        Version: <span>v{APP_VERSION}</span>
      </Container>
    </Wrapper>
  )
}


export default Footer

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 13px;
  background: ${colors.background.header};
  height: ${height.footer}px;
  display: flex;
  align-items: center;
  padding: 10px 0;
  z-index: 2;
  ${Container} {
    text-align: right;
    color: ${colors.text.gray};
    span {
      color: ${colors.primary};
      font-weight: 600;
    }
  }
`
