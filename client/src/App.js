import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    showingDadJokes: false,
    showingDevJokes: false,
    showingAllJokes: true,
    currentJoke: null,
    setup: null,
    punchline: null,
  };

  componentDidMount() {
    // this.fetchAnyJoke();
    this.refreshJoke();
  }

  fetchDadJoke = () => {
    axios
      .get('http://localhost:5000/dad-jokes')
      .then(res => {
        const { setup, punchline } = res.data;
        this.setState({ setup, punchline });
      })
      .catch(err => console.log(err));
  };

  fetchDevJoke = () => {
    axios
      .get('http://localhost:5000/dev-jokes')
      .then(res => {
        const { setup, punchline } = res.data;
        this.setState({ setup, punchline });
      })
      .catch(err => console.log(err));
  };

  fetchAnyJoke = () => {
    axios
      .get('http://localhost:5000/all-jokes')
      .then(res => {
        const { setup, punchline } = res.data;
        this.setState({ setup, punchline });
      })
      .catch(err => console.log(err));
  };

  refreshJoke = () => {
    if (this.state.showingAllJokes) {
      this.fetchAnyJoke();
    } else if (this.state.showingDadJokes) {
      this.fetchDadJoke();
    } else if (this.state.showingDevJokes) {
      this.fetchDevJoke();
    }
  };

  handleClick = e => {
    // if (e.target.classList.contains)
    if (e.target.classList.contains('dad')) {
      this.setState(
        {
          showingAllJokes: false,
          showingDevJokes: false,
          showingDadJokes: true,
        },
        () => this.refreshJoke()
      );
    } else if (e.target.classList.contains('all')) {
      this.setState(
        {
          showingAllJokes: true,
          showingDevJokes: false,
          showingDadJokes: false,
        },
        () => this.refreshJoke()
      );
    } else if (e.target.classList.contains('dev')) {
      this.setState(
        {
          showingAllJokes: false,
          showingDevJokes: true,
          showingDadJokes: false,
        },
        () => this.refreshJoke()
      );
    }
  };

  render() {
    const { showingDadJokes, showingDevJokes, showingAllJokes } = this.state;
    const dad = showingDadJokes ? ' App__button--selected' : '';
    const dev = showingDevJokes ? ' App__button--selected' : '';
    const all = showingAllJokes ? ' App__button--selected' : '';
    return (
      <div className="App">
        <div className="App__button-container">
          <button
            onClick={this.handleClick}
            className={'App__button dad' + dad}
          >
            Dad Jokes
          </button>
          <button
            onClick={this.handleClick}
            className={'App__button dev' + dev}
          >
            Programmer Jokes
          </button>
          <button
            onClick={this.handleClick}
            className={'App__button all' + all}
          >
            All Jokes
          </button>
        </div>
        <div className="App__joke">
          <p className="App__joke__setup">{this.state.setup}</p>
          <p className="App__joke__punchline">{this.state.punchline}</p>
          <button onClick={this.refreshJoke}>New Joke</button>
        </div>
      </div>
    );
  }
}

export default App;
