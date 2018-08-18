import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './util/wrappers.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// Layouts
import App from './App'
import Home from './layouts/Home'
import Upload from './layouts/Upload'
import SignUp from './layouts/SignUp'
import Profile from './layouts/Profile'
import Course from './layouts/Course'

// Redux Store
import store from './store'
const persistor = persistStore(store)
// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="course" component={Course} />
            <Route path="upload" component={UserIsAuthenticated(Upload)} />
            <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
            <Route path="profile" component={UserIsAuthenticated(Profile)} />
          </Route>
        </Router>
    </Provider>
  ),
  document.getElementById('root')
)
// <PersistGate persistor={persistor}>
// </PersistGate>
