import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../components/pageHeader';

const mapStateToProps = (state) => {
  return {
    ...state,
    username: state.username,
    profile: state.profile,
    repos: state.repos
  }
}

class User extends React.Component {
  
  onInputChange = (event) => {
    let { dispatch } = this.props;
    dispatch({type: 'UPDATE_USERNAME', username: event.target.value })
  }

  onUserChange = () => {
    let { dispatch } = this.props;
    let { username } = this.props;
    let { profile } = this.props;
    let { repos } = this.props;
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(xresponse => {
        return xresponse.json();
      })
      .then(xresponse => {
        dispatch({type: 'UPDATE_REPOS', repos: xresponse})
      });
    fetch(`https://api.github.com/users/${username}`)
      .then(xresponse => {
        return xresponse.json();
      })
      .then(xresponse => {
        dispatch({type: 'UPDATE_PROFILE', profile: xresponse})
      });
  };

  render() {
    let { profile } = this.props;
    let { repos } = this.props;
    console.log(repos);
    let repoList = repos.map((repo, i) => {
      return <li key={i} id={repo.id}><a href={repo.html_url} target="_blank">{repo.name}</a><br />{repo.description}</li>
    });
    return (
      <div className="container">
        <PageHeader title="User" />
        <input className="form-control form-control-lg" type="text" placeholder="sevx" onChange={this.onInputChange} />
        <button className="btn btn-lg" onClick={this.onUserChange}>Show Profile</button>
        <hr/>
        <h3>Stuff about <span>{profile.login}</span> on Github</h3>
        <img src={profile.avatar_url} className="gitHubAvatar" />
        <p>{profile.bio}</p>
        <h4>Repos</h4>
        <ul>
          {repoList}
        </ul>
      </div>
    );
  };
}

export default connect(mapStateToProps)(User);