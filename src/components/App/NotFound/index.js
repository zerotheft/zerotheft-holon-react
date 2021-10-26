import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Button from 'commons/Buttons'

import { HOME } from 'constants/routes'

const NotFound = () => {
  const homePage = HOME

  const history = useHistory()

  return (
    <Container>
      <h1 style={{ marginTop: 10 }}>Page Not Found</h1>
      <Paragraph>The page you are looking for doesn't exist.</Paragraph>
      <div style={{ display: 'flex' }}>
        <Button
          plain
          style={{ marginRight: 10 }}
          onClick={() => {
            history.replace(homePage)
          }}
        >
          Go to Home Page
        </Button>
        <Button
          onClick={() => {
            history.goBack()
          }}
        >
          Go Back
        </Button>
      </div>
    </Container>
  )
}

export default NotFound

const Container = styled.div`
    display: flex;
    min-height: Calc(100vh - 200px);
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
  Paragraph = styled.div`
    padding: 20px 0;
    width: 520px;
    text-align: center;
  `
