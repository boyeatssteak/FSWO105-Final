import React from 'react';
import Redux from 'redux';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

// components
import Header from './components/Header';
import { Home, User, Search } from './screens';

let initialState = {
  query: '',
  results: [],
  username: 'sevx',
  profile: [],
  repos: []
}

// initialState.repos = fetch(`https://api.github.com/users/${initialState.username}/repos`)
//   .then(xresponse => {
//     return xresponse.json();
//   })
//   .then(xresponse => {
//     return xresponse
//   });
// initialState.profile = fetch(`https://api.github.com/users/${initialState.username}`)
//   .then(xresponse => {
//     return xresponse.json();
//   })
//   .then(xresponse => {
//     return xresponse
//   });

const mapStateToProps = (state) => {
  return {
    ...state,
    query: state.query
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_SEARCH':
      return {
        ...state, query: action.query
      }
      break;
    case 'UPDATE_RESULTS':
      return {
        ...state, results: action.results
      }
      break;
    case 'UPDATE_USERNAME':
      return {
        ...state, username: action.username
      }
      break;
    case 'UPDATE_PROFILE':
      return {
        ...state, profile: action.profile
      }
      break;
    case 'UPDATE_REPOS':
      return {
        ...state, repos: action.repos
      }
      break;
    default:
      return state;
  }
}

let store = createStore(reducer);

const Index = ({ store }) => (
  <Router>
    <div className="wrap">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/user" component={User} />
    </div>
  </Router>
);

connect(mapStateToProps)(Index);

render(
  <Provider store={store}>
    <div>
      <Index />
    </div>
  </Provider>,
  document.getElementById('root')
);