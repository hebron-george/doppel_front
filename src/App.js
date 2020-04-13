import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppConstants from './AppConstants';
import axios from 'axios';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Route path="/users">
            <h1>Users</h1>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HelloWorld />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Loading from backend...',
    }
  }

  componentDidMount() {
    axios.get(AppConstants.APIEndpoints.HELLOWORLD)
      .then(response => {
        console.log("Got this response from the back end: " + JSON.stringify(response))
        this.setState({message: response.data.message})
      })
      .catch((e) => this.setState({message: "ERROR: " + e}))
  }

  render() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}

export default App;
