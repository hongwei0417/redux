import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

const middleware = [ thunk ] //將thunk加入陣列
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger()) //將createLogger也加入陣列
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware) //讓store使用middleware
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
