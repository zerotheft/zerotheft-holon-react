import React from 'react'
import PropTypes from 'prop-types'

import ErrorPage from './ErrorPage'

import Honeybadger from '@honeybadger-io/js'
import mainConfig from 'config'

const {MODE, HONEYBADGER_API_KEY} = mainConfig;

const config = {
  apiKey: HONEYBADGER_API_KEY,
  environment: `${MODE}-holon-frontend`,
}

const honeybadger = Honeybadger.configure(config)

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };

  }

  static getDerivedStateFromError(error) {
    console.log(error, 'e')
    return { hasError: true };
  }

  componentDidCatch(error) {
    honeybadger.notify(error)
    console.log('caught', error)
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorPage
        onButtonClick={() => {
          setTimeout(() => {
            this.setState({ hasError: false })
          }, 200)
        }
        } />
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node
}

export default ErrorBoundary
