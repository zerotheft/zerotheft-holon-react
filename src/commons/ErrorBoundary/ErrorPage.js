import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from 'commons/Buttons'

const ErrorPage = ({ onButtonClick }) => {
  return (
    <Container>
      <FontAwesomeIcon icon={faExclamationTriangle} size="6x" />
      <h1 style={{ marginTop: 10 }}>Oops!! Something went wrong.</h1>
      <Paragraph>
        There was some internal issue while fetching data from blockchain. We are currently finding the issue. Please
        try again later.
      </Paragraph>
      <div style={{ display: 'flex' }}>
        <Button
          plain
          style={{ marginRight: 10 }}
          onClick={() => {
            window.location.reload()
            onButtonClick && onButtonClick()
          }}
        >
          Reload
        </Button>
      </div>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
  Paragraph = styled.div`
    padding: 20px 0;
    width: 520px;
    text-align: center;
  `

ErrorPage.propTypes = {
  onButtonClick: PropTypes.func,
}

export default ErrorPage
