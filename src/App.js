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
    this.setState({ search: e.target.value, loading: true });
    if(e.target.value.length > 0) {
      _debounce(this.makeRequest, 500)(e.target.value);
    }
  };

  makeRequest = async (search) => {
    const res = await fetch(
      `https://mock-autocomplete.herokuapp.com/autocomplete?q=${search}`
    );

    const { data } = await res.json();
    
    this.setState({ data, loading: false });
  };

  render() {
    const { data, loading } = this.state;

    if(loading && data.length) {
      return <p>Loading...</p>
    }
    
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
