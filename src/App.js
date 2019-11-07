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
  }, 300);


  render() {
    const { data, loading } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <p>Word Search</p>
          <input
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
          {data.length
            ? data.map((word, i) => {
                return <p key={i}>{word}</p>;
              })
            : null}

          {loading ? <p>Loading...</p> : null}
        </header>
      </div>
    );
  }
}

export default App;
