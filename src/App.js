import React, { PureComponent } from 'react';
import _debounce from 'lodash.debounce'
import './App.css';

class App extends PureComponent {
  state = {
    search: "",
    loading: false,
    data: []
  };

  handleChange = e => {
    this.handleRequest(e.target.value);
    this.setState({ search: e.target.value, loading: true, data: [] });
  };

  handleRequest = _debounce(async (search) => {
    const res = await fetch(
      `https://mock-autocomplete.herokuapp.com/autocomplete?q=${search}`
    );

    const { data } = await res.json();

    this.setState({ data, loading: false });
  }, 500);

  renderResults = () => {
    const { data } = this.state;

    return (
      <div className="search-result-container">
        {data.length
          ? data.map((word, i) => {
              return (
                <div className="search-result" key={i}>
                  {word}
                </div>
              );
            })
          : null}
      </div>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="App">
        <div className="App-container">
          <h1>Word Search</h1>
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
            placeholder="Search for a word"
          />
          {this.renderResults()}
          {loading ? <p>Loading...</p> : null}
        </div>
      </div>
    );
  }
}

export default App;
