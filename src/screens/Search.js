import React from 'react';
import { connect } from 'react-redux';

import PageHeader from '../components/pageHeader';

const mapStateToProps = (state) => {
  return {
    ...state,
    query: state.query,
    results: state.results
  }
}

class Search extends React.Component {
  
  onQueryChange = (event) => {
    let { dispatch } = this.props;
    dispatch({type: 'UPDATE_SEARCH', query: event.target.value })
  }

  onSearch = () => {
    let { dispatch } = this.props;
    let { query } = this.props;
    fetch(`https://api.github.com/search/repositories?q=${query}`)
      .then(xresponse => {
        return xresponse.json();
      })
      .then(xresponse => {
        dispatch({type: 'UPDATE_RESULTS', results: xresponse.items})
      })
  }

  render() {
    let results = this.props.results.map((result, i) => {
        return <li key={i} id={result.id}><a href={result.html_url} target="_blank">{result.name}</a> by <a href={result.owner.html_url} target="_blank">{result.owner.login}</a><br />{result.description}</li>
    });
    return (
      <div className="container">
        <PageHeader title="Search" />
        <input className="form-control form-control-lg" type="text" onChange={this.onQueryChange} />
        <button className="btn btn-lg" onClick={this.onSearch}>Search</button>
        <hr/>
        <h3>Search results for <span>{this.props.query}</span></h3>
        <ul>
          {results}
        </ul>
      </div>
    );
  };
}

export default connect(mapStateToProps)(Search);