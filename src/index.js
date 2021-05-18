import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/jsdom'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import './index.css'

const root = document.getElementById('root')

if (root !== null) {
    const component = <App />

    ReactDOM.render(component, root)

    if (module.hot) {
        module.hot.accept(App, () => {
            const HMRApp = App.default
            ReactDOM.render(HMRApp, document.getElementById('root'))
        })
    }
}
